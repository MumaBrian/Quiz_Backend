import { Request, Response } from "express";
import { AdminService } from "../../services";
import { Admin } from "../../types";

export default class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  async createAdmin(req: Request, res: Response): Promise<void> {
    try {
      const admin: Admin = req.body;
      await this.adminService.createAdminCollection(admin);
      res
        .status(201)
        .json({ message: "Admin collection created successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to create admin collection." });
    }
  }
}
