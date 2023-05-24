import { AuthService } from "../../services";
import { Instructor,Participant, User } from "../../types";
import { Body, Post, Route, Tags } from "tsoa";
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

  @Post("/login/participant")
  public async loginParticipant(
    @Body() data: { email: string; password: string }
  ): Promise<any> {
  	return new AuthService().loginParticipant(data);
  }

  @Post("/verify/participantEmail")
  public async verifyParticipantEmail(
    @Body() data: { email: string; verification_code: string }
  ): Promise<any> {
  	return new AuthService().verifyParticipantEmail(data);
  }

  @Post("/resend/participantotp")
  public async resendParticipantOTP(@Body() email: string): Promise<any> {
  	return new AuthService().resendParticipantOTP(email);
  }

  @Post("/forgot/participantpassword")
  public async forgotParticipantPassword(@Body() email: string): Promise<any> {
  	return new AuthService().forgotParticipantPassword(email);
  }

  @Post("/reset/participantpassword")
  public async resetParticipantPassword(
    @Body()
    	data: {
      email: string;
      password: string;
    }
  ): Promise<any> {
  	return new AuthService().resetParticipantPassword(data);
  }

  @Post("/update/participantpassword")
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
  public async registerInstructor(@Body() data: Instructor): Promise<any> {
  	return new AuthService().registerInstructor(data);
  }

  @Post("/login/instructor")
  public async loginInstructor(
    @Body() data: { email: string; password: string }
  ): Promise<any> {
  	return new AuthService().loginParticipant(data);
  }

  @Post("/verify/Instructor")
  public async verifyInstructorEmail(
    @Body() data: { email: string; verification_code: string }
  ): Promise<any> {
  	return new AuthService().verifyInstructorEmail(data);
  }

  @Post("/resend/instructorotp")
  public async resendInstructorOTP(@Body() email: string): Promise<any> {
  	return new AuthService().resendInstructorOTP(email);
  }

  @Post("/forgot/instructorpassword")
  public async forgotInstructorPassword(@Body() email: string): Promise<any> {
  	return new AuthService().forgotInstructorPassword(email);
  }

  @Post("/reset/instructorpassword")
  public async resetInstructorPassword(
    @Body()
    	data: {
      email: string;
      password: string;
    }
  ): Promise<any> {
  	return new AuthService().resetInstructorPassword(data);
  }

  @Post("/update/instructorpassword")
  public async updateInstructorPassword(
    @Body()
    	data: {
      currentPassword: string;
      email: string;
      newPassword: string;
    }
  ): Promise<any> {
  	return new AuthService().updateInstructorPassword(data);
  }
}

