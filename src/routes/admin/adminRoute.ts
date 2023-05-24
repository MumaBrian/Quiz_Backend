import express from "express";
import { AdminController } from "../../contollers";

export default class AdminRoutes {
	router = express.Router();
	public response =  new AdminController().createAdmin
	public responseId= new AdminController().getAdminById
	protected adminRoutes(): void {
		this.router.get("/admin", this.response)
		this.router.get("/admin/:id", this.responseId);

	}
}
