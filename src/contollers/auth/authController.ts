import { AuthService } from "../../services";
import { User } from "../../types";

export default class AuthController {
    public login(user: User, isVerify: string): User | undefined {
        return new AuthService().login(user, isVerify);
    }
}