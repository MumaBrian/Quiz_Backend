import { User, Instructor, Participant } from "../../types";
import  {firebaseInstance} from "../../firebase";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

export default class AuthService {
  private db;

    public constructor() {
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

    try {
      const uuid = this.genUUID();

      const participant = {
        email: data.email,
        password: hashedPassword,
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
          DOB: "xx/xx/xx",
        },
      };
    }
  }
}
