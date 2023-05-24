
import { AuthService } from "../../services";
import { User } from "../../types";
import { Body, Post, Route, Tags } from "tsoa";
import {Participant} from "../../types";
@Route("/api/auth")
@Tags("Authentication controller Options")
export default class AuthController {
	public login(user: User, isVerify: string): User | undefined {
		return new AuthService().login(user, isVerify);
	}

  @Post("/register/participant")
	public async registerParticipant(@Body() data: Participant): Promise<any> {
		return new AuthService().registerParticipant(data);
	}
}
