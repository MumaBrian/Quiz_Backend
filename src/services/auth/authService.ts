import {Participant,User } from "../../types";
import { Mailer } from "../../mail";
import { firebaseInstance } from "../../firebase";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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

		return uuid
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

	public async registerParticipant(data: Participant): Promise<any> {
		const hashedPassword = await this.hashPassword(data.password);
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
			return {
				error: "request should be of the format below",
				format: {
					email: "xxxxxxx@gmail.com",
					password: "xxxxxxx",
					firstName: "xxx",
					lastName: "xxx",
					phoneNumber: "xxxxxxxx",
					isVerified: false,
					DOB: "xx/xx/xx",
				},
			};
		}
	}
}
