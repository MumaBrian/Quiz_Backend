import { AdminService } from "../../services";
import { Admin } from "../../types";
import { Route, Post, Body, Controller, Tags } from "tsoa";

@Route("/api/auth")
@Tags("Auth Operation")
export default class AdminController {
  @Post("/login")
  public async login(@Body() user: Admin): Promise<Admin | undefined> {
    return await new AdminService().getAdminById(user.id);
  }

  // Rest of the AuthController code...
}
