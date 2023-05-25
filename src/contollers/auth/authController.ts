import { AuthService } from "../../services";
import { Participant,User } from "../../types";
import { Body, Post, Route, Tags } from "tsoa";

export type RegisterParticipantType = Omit<Participant, "otp" | "id" | "isVerified">;

@Route("/api/auth")
@Tags("Authentication controller Options")
export default class AuthController {
	public login(user: User, isVerify: string): User | undefined {
		return new AuthService().login(user, isVerify);
	}

  @Post("/register/participant")
	public async registerParticipant(
    @Body() data: RegisterParticipantType
	): Promise<any> {
		return new AuthService().registerParticipant(data);
	}

  @Post("/verify/participantemail")
  public async verifyParticipantEmail(
    @Body() data: { email: string; verification_code: string }
  ): Promise<any> {
  	return new AuthService().verifyParticipantEmail(data);
  }

  //   @Post("/resend/participantotp")
  //   public async resendParticipantOTP(@Body() email: string): Promise<any> {
  //   	return new AuthService().resendParticipantOTP(email);
  //   }

  @Post("/login/participant")
  public async loginParticipant(
    @Body() data: { email: string; password: string }
  ): Promise<any> {
  	return new AuthService().loginParticipant(data);
  }
}
