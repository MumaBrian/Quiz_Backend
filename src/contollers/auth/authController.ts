import { AuthService } from "../../services";
import { Instructor,Participant,User } from "../../types";
import { Body, Post, Route, Tags } from "tsoa";

export type RegisterParticipantType = Omit<Participant, "otp" | "id" | "isVerified">;
export type RegisterInstructorType = Omit<Instructor,"otp" | "id" | "isVerified">;

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

  @Post("/verify/participant-email")
  public async verifyParticipantEmail(
    @Body() data: { email: string; verification_code: string }
  ): Promise<any> {
  	return new AuthService().verifyParticipantEmail(data);
  }

  @Post("/resend/participant-otp")
  public async resendParticipantOTP(
    @Body() data: { email: string }
  ): Promise<any> {
  	return new AuthService().resendParticipantOTP(data);
  }

  @Post("/login/participant")
  public async loginParticipant(
    @Body() data: { email: string; password: string }
  ): Promise<any> {
  	return new AuthService().loginParticipant(data);
  }

  @Post("/forgot/participant-password")
  public async forgotParticipantPassword(
    @Body() data: { email: string }
  ): Promise<any> {
  	return new AuthService().forgotParticipantPassword(data);
  }

  @Post("/reset/participant-password")
  public async resetParticipantPassword(
    @Body()
    	data: {
      email: string;
      password: string;
    }
  ): Promise<any> {
  	return new AuthService().resetParticipantPassword(data);
  }

  @Post("/update/participant-password")
  public async updateParticipantPassword(
    @Body()
    	data: {
      currentPassword: string;
      email: string;
      newPassword: string;
    }
  ): Promise<any> {
  	return new AuthService().updateParticipantPassword(data);
  }

  @Post("/register/instructor")
  public async RegisterInstructor(
    @Body() data: RegisterInstructorType
  ): Promise<any> {
  	return new AuthService().registerInstructor(data);
  }

  @Post("/verify/instructor-email")
  public async verifyInstructorEmail(
    @Body() data: { email: string; verification_code: string }
  ): Promise<any> {
  	return new AuthService().verifyInstructorEmail(data);
  }

  @Post("/login/instructor")
  public async loginInstructor(
    @Body() data: { email: string; password: string }
  ): Promise<any> {
  	return new AuthService().loginInstructor(data);
  }
}
