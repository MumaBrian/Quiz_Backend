import { Admin, Instructor, Participant, User } from "../../types";
import { Mailer } from "../../mail";
import { firebaseInstance } from "../../firebase";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
	RegisterAdminType,
	RegisterInstructorType,
	RegisterParticipantType,
} from "../../controllers/auth/authController";
import { APPCONFIGS } from "../../configs";
import jwt from "jsonwebtoken";

// import { AuthorizationService } from "../../authorization";

export default class AuthService {
	private db;
	private mailer;

	public constructor() {
		this.mailer = new Mailer();
		this.db = firebaseInstance.firestore();
	}

	private async hashPassword(password) {
		const salt = await bcrypt.genSalt(12);
		return await bcrypt.hash(password, salt);
	}

	private genUUID() {
		const uuid = uuidv4();

		return uuid;
	}

	private createAuthToken(payload) {
		const token = jwt.sign(payload, APPCONFIGS.JWT.SECRET, {
			expiresIn: APPCONFIGS.JWT.EXPIRATION,
		});

		return token;
	}

	public login(user: User, isVerify: string): User | undefined {
		const allowedUser = "test@gmail.com";
		if (user.email === allowedUser) {
			user.isVerify = this.getIsVerify(isVerify);
			return user;
		}
	}

	private getIsVerify(isVerify: string): boolean | undefined {
		if (isVerify != undefined) {
			const userIsverify = Number(isVerify);
			if (!Number.isNaN(userIsverify)) {
				return userIsverify > 0;
			}
		}
		return false;
	}

	//Participant

	public async registerParticipant(
		data: RegisterParticipantType
	): Promise<any> {
		const hashedPassword = await this.hashPassword(data.password);

		const existingParticipant = await this.getParticipantByEmail(data.email);

		if (existingParticipant) {
			return {
				error: "An account with this email already exists",
			};
		}

		const verMail = await this.mailer.sendOTPMail(data.email);

		if (!verMail.emailSent) {
			return {
				error: "There was an error while trying to send email",
			};
		}

		try {
			const uuid = this.genUUID();

			const participant = {
				email: data.email,
				password: hashedPassword,
				otp: verMail.verCode,
				firstName: data?.firstName,
				lastName: data?.lastName,
				profilePic: data?.profilePic,
				phoneNumber: data?.phoneNumber,
				DOB: data.DOB,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
				id: uuid,
			};

			const participants = this.db.collection("participants");
			const docRef = participants.doc(uuid);

			const result = await docRef.set(participant);

			console.log(result);

			return {
				user: participant,
			};
		} catch (error) {
			throw new Error(
				"An error occurred while registering the participant, check your details!!"
			);
		}
	}

	public async getParticipantByEmail(
		email: string
	): Promise<Participant | undefined> {
		let user;
		try {
			const querySnapshot = await this.db
				.collection("participants")
				.where("email", "==", email)
				.get();

			querySnapshot.forEach((doc) => {
				console.log(doc.id, " == ", doc.data());
				user = doc.data();
			});
		} catch (error) {
			return undefined;
		}

		return user;
	}

	public async updateParticipant(
		participant: Participant
	): Promise<Participant | undefined> {
		const ref = this.db.collection("participants").doc(participant.id);
		await ref.update(participant);

		// Retrieve the updated user object
		const updatedParticipant = await this.getParticipantByEmail(
			participant.email
		);

		return updatedParticipant;
	}

	public async verifyParticipantEmail(data: {
    email: string;
    verification_code: string;
  }) {
		const user = await this.getParticipantByEmail(data.email);

		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		if (user?.isVerified) {
			return {
				error: "This account has already been verified",
			};
		}

		const equal = bcrypt.compare(user?.otp, data.verification_code);

		if (equal) {
			user.isVerified = true;
			const updateUser = await this.updateParticipant(user);

			return {
				user: updateUser,
				verified: true,
			};
		} else {
			return {
				verified: false,
				error: "Invalid verification code",
			};
		}
	}
	public async resendParticipantOTP(data: { email: string }) {
		const user: Participant | undefined = await this.getParticipantByEmail(
			data.email
		);
		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		if (user.isVerified) {
			return {
				error: "This account has already been verified",
			};
		}

		const sendVerificationCode = await this.mailer.sendOTPMail(data.email);

		if (sendVerificationCode?.emailSent) {
			user.otp = sendVerificationCode.verCode;
			const updatedUser = await this.updateParticipant(user);
			if (!updatedUser) {
				return {
					error: "There was an error resending passcode",
				};
			}
			return {
				user: updatedUser,
			};
		} else {
			return {
				error: "There was an error sending the verification code",
			};
		}
	}

	public async loginParticipant(data: {
    email: string;
    password: string;
  }): Promise<any> {
		const user = await this.getParticipantByEmail(data.email);
		if (!user) {
			return {
				error: "No account with this email",
			};
		}

		const equal = bcrypt.compare(user?.password, data.password);
		if (!equal) {
			return {
				error: "Incorrect email and password combination",
			};
		}
		const token = this.createAuthToken({ email: user.email });
		return {
			user: user,
			token: token,
		};
	}

	public async forgotParticipantPassword(data: { email: string }) {
		try {
			const user = await this.getParticipantByEmail(data.email);
			if (!user) {
				throw new Error("Ooops! email not available");
			}

			user.isVerified = false;
			const sendToken = await this.mailer.sendOTPMail(data.email);

			let updatedUser: Participant | undefined;

			if (sendToken?.emailSent) {
				user.otp = sendToken.verCode;
				updatedUser = await this.updateParticipant(user);
			}

			if (!updatedUser) {
				throw new Error("There was an error sending the password reset token");
			}

			return {
				user: updatedUser,
			};
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}

	public async resetParticipantPassword(data: {
    email: string;
    password: string;
  }) {
		const user = await this.getParticipantByEmail(data.email);
		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		const newPasswordHashed = await this.hashPassword(data.password);
		user.password = newPasswordHashed;

		const token = this.createAuthToken(user.email);

		const updatedUser = await this.updateParticipant(user);

		if (!updatedUser) {
			return {
				error: "There was an error resending passcode",
			};
		}

		return {
			user: updatedUser,
			token: token,
		};
	}

	public async updateParticipantPassword(data: {
    currentPassword: string;
    email: string;
    newPassword: string;
  }) {
		const { currentPassword, newPassword, email } = data;

		const user: Participant | undefined = await this.getParticipantByEmail(
			email
		);

		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		const equal = bcrypt.compare(user?.password, currentPassword);

		if (!equal) {
			return "your current password is incorrect";
		}

		const newPasswordHashed = await this.hashPassword(newPassword);
		user.password = newPasswordHashed;

		const token = this.createAuthToken(email);

		const updatedUser = await this.updateParticipant(user);

		if (!updatedUser) {
			return {
				error: "There was an error resending code",
			};
		}

		return {
			user: updatedUser,
			token: token,
		};
	}

	//Instructor

	public async getInstructorByEmail(
		email: string
	): Promise<Instructor | undefined> {
		let user;
		try {
			const querySnapshot = await this.db
				.collection("instructors")
				.where("email", "==", email)
				.get();

			querySnapshot.forEach((doc) => {
				console.log(doc.id, " == ", doc.data());
				user = doc.data();
			});
		} catch (error) {
			return undefined;
		}

		return user;
	}

	public async registerInstructor(data: RegisterInstructorType): Promise<any> {
		const hashedPassword = await this.hashPassword(data.password);

		const existingInstructor = await this.getInstructorByEmail(data.email);

		if (existingInstructor) {
			return {
				error: "An account with this email already exists",
			};
		}

		const verMail = await this.mailer.sendOTPMail(data.email);

		if (!verMail.emailSent) {
			return {
				error: "There was an error while trying to send email",
			};
		}

		try {
			const uuid = this.genUUID();

			const instructor = {
				email: data.email,
				password: hashedPassword,
				otp: verMail.verCode,
				firstName: data?.firstName,
				lastName: data?.lastName,
				profilePic: data?.profilePic,
				phoneNumber: data?.phoneNumber,
				resume: data.resume,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
				id: uuid,
		
			};

			const instructors = this.db.collection("instructors");
			const docRef = instructors.doc(uuid);

			const result = await docRef.set(instructor);

			// Associate the instructor with quizzes
			const quizzes = this.db.collection("quizzes");
			const instructorQuizzes = await quizzes
				.where("uuid", "==", "")
				.get(); // Query for quizzes without an instructorId

			const batch = this.db.batch();
			instructorQuizzes.forEach((quizDoc) => {
				const quizRef = quizzes.doc(quizDoc.id);
				batch.update(quizRef, { instructorId: uuid });
			});

			await batch.commit();

			console.log(result);

			return {
				user: instructor,
			};
		} catch (error) {
			throw new Error(
				"An error occurred while registering the participant, check your details!!"
			);
		}
	}

	public async updateInstructor(
		instructor: Instructor
	): Promise<Instructor | undefined> {
		const ref = this.db.collection("instructors").doc(instructor.id);
		await ref.update(instructor);

		// Retrieve the updated user object
		const updatedInstructor = await this.getInstructorByEmail(instructor.email);

		return updatedInstructor;
	}

	public async verifyInstructorEmail(data: {
    email: string;
    verification_code: string;
  }) {
		const user = await this.getInstructorByEmail(data.email);

		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		if (user?.isVerified) {
			return {
				error: "This account has already been verified",
			};
		}

		const equal = bcrypt.compare(user?.otp, data.verification_code);

		if (equal) {
			user.isVerified = true;
			const updateUser = await this.updateInstructor(user);

			// Approve the instructor account

			// const authorizationService = new AuthorizationService();
			// await authorizationService.approveInstructorAccount(user.email);

			return {
				user: updateUser,
				verified: true,
			};
		} else {
			return {
				verified: false,
				error: "Invalid verification code",
			};
		}
	}

	public async resendInstructorOTP(data: { email: string }) {
		const user: Instructor | undefined = await this.getInstructorByEmail(
			data.email
		);
		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		if (user.isVerified) {
			return {
				error: "This account has already been verified",
			};
		}

		const sendVerificationCode = await this.mailer.sendOTPMail(data.email);

		if (sendVerificationCode?.emailSent) {
			user.otp = sendVerificationCode.verCode;
			const updatedUser = await this.updateInstructor(user);
			if (!updatedUser) {
				return {
					error: "There was an error resending passcode",
				};
			}
			return {
				user: updatedUser,
			};
		} else {
			return {
				error: "There was an error sending the verification code",
			};
		}
	}

	public async loginInstructor(data: {
    email: string;
    password: string;
  }): Promise<any> {
		const user = await this.getInstructorByEmail(data.email);
		if (!user) {
			return {
				error: "No account with this email",
			};
		}

		const equal = bcrypt.compare(user?.password, data.password);
		if (!equal) {
			return {
				error: "Incorrect email and password combination",
			};
		}
		const token = this.createAuthToken({ email: user.email });
		return {
			user: user,
			token: token,
		};
	}

	public async forgotInstructorPassword(data: { email: string }) {
		try {
			const user = await this.getInstructorByEmail(data.email);
			if (!user) {
				throw new Error("Ooops! email not available");
			}

			user.isVerified = false;
			const sendToken = await this.mailer.sendOTPMail(data.email);

			let updatedUser: Instructor | undefined;

			if (sendToken?.emailSent) {
				user.otp = sendToken.verCode;
				updatedUser = await this.updateInstructor(user);
			}

			if (!updatedUser) {
				throw new Error("There was an error sending the password reset token");
			}

			return {
				user: updatedUser,
			};
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}

	public async resetInstructorPassword(data: {
    email: string;
    password: string;
  }) {
		const user = await this.getInstructorByEmail(data.email);
		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		const newPasswordHashed = await this.hashPassword(data.password);
		user.password = newPasswordHashed;

		const token = this.createAuthToken(user.email);

		const updatedUser = await this.updateInstructor(user);

		if (!updatedUser) {
			return {
				error: "There was an error resending passcode",
			};
		}

		return {
			user: updatedUser,
			token: token,
		};
	}

	public async updateInstructorPassword(data: {
    currentPassword: string;
    email: string;
    newPassword: string;
  }) {
		const { currentPassword, newPassword, email } = data;

		const user: Instructor | undefined = await this.getInstructorByEmail(email);

		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		const equal = bcrypt.compare(user?.password, currentPassword);

		if (!equal) {
			return "your current password is incorrect";
		}

		const newPasswordHashed = await this.hashPassword(newPassword);
		user.password = newPasswordHashed;

		const token = this.createAuthToken(email);

		const updatedUser = await this.updateInstructor(user);

		if (!updatedUser) {
			return {
				error: "There was an error resending code",
			};
		}

		return {
			user: updatedUser,
			token: token,
		};
	}

	// Admin

	public async getAdminByEmail(email: string): Promise<Admin | undefined> {
		let user;
		try {
			const querySnapshot = await this.db
				.collection("admins")
				.where("email", "==", email)
				.get();

			querySnapshot.forEach((doc) => {
				console.log(doc.id, " == ", doc.data());
				user = doc.data();
			});
		} catch (error) {
			return undefined;
		}

		return user;
	}

	public async registerAdmin(data: RegisterAdminType): Promise<any> {
		const hashedPassword = await this.hashPassword(data.password);

		const existingAdmin = await this.getAdminByEmail(data.email);

		if (existingAdmin) {
			return {
				error: "An account with this email already exists",
			};
		}

		// Check if there are any existing admin accounts
		const adminsSnapshot = await this.db.collection("admins").get();
		if (!adminsSnapshot.empty) {
			return {
				error: "An admin account already exists, please login",
			};
		}

		const verMail = await this.mailer.sendOTPMail(data.email);

		if (!verMail.emailSent) {
			return {
				error: "There was an error while trying to send email",
			};
		}

		try {
			const uuid = this.genUUID();

			const admin = {
				email: data.email,
				password: hashedPassword,
				otp: verMail.verCode,
				Name: data?.Name,
				id: uuid,
			};

			const admins = this.db.collection("admins");
			const docRef = admins.doc(uuid);

			const result = await docRef.set(admin);

			console.log(result);

			return {
				user: admin,
			};
		} catch (error) {
			throw new Error(
				"An error occurred while registering the participant, check your details!!"
			);
		}
	}

	public async updateAdmin(admin: Admin): Promise<Admin | undefined> {
		const ref = this.db.collection("admins").doc(admin.id);
		await ref.update(admin);

		// Retrieve the updated user object
		const updatedAdmin = await this.getAdminByEmail(admin.email);

		return updatedAdmin;
	}

	public async verifyAdminEmail(data: {
    email: string;
    verification_code: string;
  }) {
		const user = await this.getAdminByEmail(data.email);

		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		if (user?.isVerified) {
			return {
				error: "This account has already been verified",
			};
		}

		const equal = bcrypt.compare(user?.otp, data.verification_code);

		if (equal) {
			user.isVerified = true;
			const updateUser = await this.updateAdmin(user);

			return {
				user: updateUser,
				verified: true,
			};
		} else {
			return {
				verified: false,
				error: "Invalid verification code",
			};
		}
	}

	public async resendAdminOTP(data: { email: string }) {
		const user: Admin | undefined = await this.getAdminByEmail(data.email);
		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		if (user.isVerified) {
			return {
				error: "This account has already been verified",
			};
		}

		const sendVerificationCode = await this.mailer.sendOTPMail(data.email);

		if (sendVerificationCode?.emailSent) {
			user.otp = sendVerificationCode.verCode;
			const updatedUser = await this.updateAdmin(user);
			if (!updatedUser) {
				return {
					error: "There was an error resending passcode",
				};
			}
			return {
				user: updatedUser,
			};
		} else {
			return {
				error: "There was an error sending the verification code",
			};
		}
	}

	public async loginAdmin(data: {
    email: string;
    password: string;
  }): Promise<any> {
		const user = await this.getAdminByEmail(data.email);
		if (!user) {
			return {
				error: "No account with this email",
			};
		}

		const equal = bcrypt.compare(user?.password, data.password);
		if (!equal) {
			return {
				error: "Incorrect email and password combination",
			};
		}
		const token = this.createAuthToken({ email: user.email });
		return {
			user: user,
			token: token,
		};
	}

	public async forgotAdminPassword(data: { email: string }) {
		try {
			const user = await this.getAdminByEmail(data.email);
			if (!user) {
				throw new Error("Ooops! email not available");
			}

			user.isVerified = false;
			const sendToken = await this.mailer.sendOTPMail(data.email);

			let updatedUser: Admin | undefined;

			if (sendToken?.emailSent) {
				user.otp = sendToken.verCode;
				updatedUser = await this.updateAdmin(user);
			}

			if (!updatedUser) {
				throw new Error("There was an error sending the password reset token");
			}

			return {
				user: updatedUser,
			};
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}

	public async resetAdminPassword(data: { email: string; password: string }) {
		const user = await this.getAdminByEmail(data.email);
		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		const newPasswordHashed = await this.hashPassword(data.password);
		user.password = newPasswordHashed;

		const token = this.createAuthToken(user.email);

		const updatedUser = await this.updateAdmin(user);

		if (!updatedUser) {
			return {
				error: "There was an error resending passcode",
			};
		}

		return {
			user: updatedUser,
			token: token,
		};
	}

	public async updateAdminPassword(data: {
    currentPassword: string;
    email: string;
    newPassword: string;
  }) {
		const { currentPassword, newPassword, email } = data;

		const user: Admin | undefined = await this.getAdminByEmail(email);

		if (!user) {
			return {
				error: "There is no account in our system with this email",
			};
		}

		const equal = bcrypt.compare(user?.password, currentPassword);

		if (!equal) {
			return "your current password is incorrect";
		}

		const newPasswordHashed = await this.hashPassword(newPassword);
		user.password = newPasswordHashed;

		const token = this.createAuthToken(email);

		const updatedUser = await this.updateAdmin(user);

		if (!updatedUser) {
			return {
				error: "There was an error resending code",
			};
		}

		return {
			user: updatedUser,
			token: token,
		};
	}
}
