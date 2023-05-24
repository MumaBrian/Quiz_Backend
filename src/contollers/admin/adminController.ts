import { Request, Response } from "express";
import { AdminService } from "../../services";
import { Admin } from "../../types";

export default class AdminController {

	public async createAdmin(req: Request, res: Response) {
		try {
			const adminData: Admin = req.body;
			const createdAdmin = await new AdminService().createAdmin(adminData);
			res.status(201).json(createdAdmin);
		} catch (error) {
			console.error("Error creating admin:", error);
			res.status(500).json({ error: "Failed to create admin" });
		}
	}
    
	public async getAdminById(req: Request, res: Response) {
		try {
			const adminId: string = req.params.id;
			const admin = await new AdminService().getAdminById(adminId);
			if (admin) {
				res.json(admin);
			} else {
				res.status(404).json({ error: "Admin not found" });
			}
		} catch (error) {
			console.error("Error getting admin:", error);
			res.status(500).json({ error: "Failed to get admin" });
		}
	}
}