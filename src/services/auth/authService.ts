import { User, Instructor, Participant } from "../../types";
import { firebaseInstance } from "../../firebase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { Mailer } from "../../mail";
import { APPCONFIGS } from "../../configs";

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
    const uuid = otpGenerator.generate(32, {
      upperCaseAlphabets: true,
      specialChars: false,
      lowerCaseAlphabets: true,
    });

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
  public async updateParticipant(
    participant: Participant
  ): Promise<Participant | undefined> {
    const ref = this.db.collection("participants").doc(participant.id);
    await ref.update(participant);

    const updated_participant = this.getParticipantByEmail(participant.email);

    return updated_participant;
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

  public async resendParticipantOTP(email: string) {
    const user: Participant | undefined = await this.getParticipantByEmail(
      email
    );
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

    user.isVerified = false;
    const sendVerificationCode = await this.mailer.sendOTPMail(email);

    let updatedUser: Participant | undefined;

    if (sendVerificationCode?.emailSent) {
      user.otp = sendVerificationCode.verCode;
      updatedUser = await this.updateParticipant(user);
    }

    if (!updatedUser) {
      return {
        error: "There was an error resending passcode",
      };
    }
    return {
      user: updatedUser,
    };
  }

  public async forgotParticipantPassword(email: string) {
    const user = await this.getParticipantByEmail(email);
    if (!user) {
      return {
        error: "There is no account in our system with this email",
      };
    }
    user.isVerified = false;
    const sendToken = await this.mailer.sendOTPMail(email);

    let updatedUser: Participant | undefined;

    if (sendToken?.emailSent) {
      user.otp = sendToken.verCode;
      updatedUser = await this.updateParticipant(user);
    }

    if (!updatedUser) {
      return {
        error: "There was an error sending reset token for password",
      };
    } else {
      return {
        user: updatedUser,
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
        error: "There was an error resending passcode",
      };
    }

    return {
      user: updatedUser,
      token: token,
    };
  }

  public async registerInstructor(data: Instructor): Promise<any> {
    const hashedPassword = await this.hashPassword(data.password);
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

      console.log(result);

      return {
        user: instructor,
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
          resume: "upload file",
        },
      };
    }
  }

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

  public async updateInstructor(
    instructor: Instructor
  ): Promise<Instructor | undefined> {
    const ref = this.db.collection("instructors").doc(instructor.id);
    await ref.update(instructor);

    const updated_instructor = this.getInstructorByEmail(instructor.email);

    return updated_instructor;
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

  public async resendInstructorOTP(email: string) {
    const user: Instructor | undefined = await this.getInstructorByEmail(
      email
    );
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

    user.isVerified = false;
    const sendVerificationCode = await this.mailer.sendOTPMail(email);

    let updatedUser: Instructor | undefined;

    if (sendVerificationCode?.emailSent) {
      user.otp = sendVerificationCode.verCode;
      updatedUser = await this.updateInstructor(user);
    }

    if (!updatedUser) {
      return {
        error: "There was an error resending passcode",
      };
    }
    return {
      user: updatedUser,
    };
  }

  public async forgotInstructorPassword(email: string) {
    const user = await this.getInstructorByEmail(email);
    if (!user) {
      return {
        error: "There is no account in our system with this email",
      };
    }
    user.isVerified = false;
    const sendToken = await this.mailer.sendOTPMail(email);

    let updatedUser: Instructor | undefined;

    if (sendToken?.emailSent) {
      user.otp = sendToken.verCode;
      updatedUser = await this.updateInstructor(user);
    }

    if (!updatedUser) {
      return {
        error: "There was an error sending reset token for password",
      };
    } else {
      return {
        user: updatedUser,
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
        error: "There was an error resending passcode",
      };
    }

    return {
      user: updatedUser,
      token: token,
    };
  }
}
