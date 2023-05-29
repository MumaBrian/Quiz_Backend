import { AuthService } from "../../services";
import { Admin,Instructor,Participant,User } from "../../types";
import { Body, Post, Route, Tags } from "tsoa";

export type RegisterParticipantType = Omit<Participant, "otp" | "id" | "isVerified">;
export type RegisterInstructorType = Omit<Instructor,"otp" | "id" | "isVerified">;
export type RegisterAdminType = Omit<Admin,"otp" | "id" | "isVerified">;

@Route("/api/auth")
@Tags("Authentication controller Options")
export default class AuthController {
	public login(user: User, isVerify: string): User | undefined {
		return new AuthService().login(user, isVerify);
	}
  // Admin
  @Post("/register/admin")
	public async registerAdmin(@Body() data: RegisterAdminType): Promise<any> {
		return new AuthService().registerAdmin(data);
	}

  @Post("/verify/admin-email")
  public async verifyAdminEmail(
    @Body() data: { email: string; verification_code: string }
  ): Promise<any> {
  	return new AuthService().verifyAdminEmail(data);
  }

  @Post("/resend/admin-otp")
  public async resendAdminOTP(@Body() data: { email: string }): Promise<any> {
  	return new AuthService().resendAdminOTP(data);
  }

  @Post("/login/admin")
  public async loginAdmin(
    @Body() data: { email: string; password: string }
  ): Promise<any> {
  	return new AuthService().loginAdmin(data);
  }

  @Post("/forgot/admin-password")
  public async forgotAdminPassword(
    @Body() data: { email: string }
  ): Promise<any> {
  	return new AuthService().forgotAdminPassword(data);
  }

  @Post("/reset/admin-password")
  public async resetAdminPassword(
    @Body()
    	data: {
      email: string;
      password: string;
    }
  ): Promise<any> {
  	return new AuthService().resetAdminPassword(data);
  }

  @Post("/update/admin-password")
  public async updateAdminPassword(
    @Body()
    	data: {
      currentPassword: string;
      email: string;
      newPassword: string;
    }
  ): Promise<any> {
  	return new AuthService().updateAdminPassword(data);
  }

  //Participants

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

  //Instructor

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

  @Post("/resend/instructor-otp")
  public async resendInstructorOTP(
    @Body() data: { email: string }
  ): Promise<any> {
  	return new AuthService().resendInstructorOTP(data);
  }

  @Post("/login/instructor")
  public async loginInstructor(
    @Body() data: { email: string; password: string }
  ): Promise<any> {
  	return new AuthService().loginInstructor(data);
  }

  @Post("/forgot/instructor-password")
  public async forgotInstructorPassword(
    @Body() data: { email: string }
  ): Promise<any> {
  	return new AuthService().forgotInstructorPassword(data);
  }

  @Post("/reset/instructor-password")
  public async resetInstructorPassword(
    @Body()
    	data: {
      email: string;
      password: string;
    }
  ): Promise<any> {
  	return new AuthService().resetInstructorPassword(data);
  }

  @Post("/update/instructor-password")
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
