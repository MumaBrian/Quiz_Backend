import { User } from "../../types";

export default class AuthService {
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
}
