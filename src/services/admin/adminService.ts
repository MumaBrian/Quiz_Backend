import { Admin, AdminModel } from "../../types";

export default class AdminService {
  private adminModel: AdminModel;

  constructor() {
    this.adminModel = new AdminModel();
  }

  public async createAdmin(admin: Admin): Promise<void> {
    await this.adminModel.createAdmin(admin);
  }

  public async getAdminById(id: string): Promise<Admin | null> {
    const admin = await this.adminModel.getAdminById(id);
    return admin;
  }

  // Rest of the AuthService code...
}
