import express from "express";
import { CategoryController } from "../../contollers";

export default class CategoryRoutes {
	router = express.Router();
	public response = new CategoryController().createCategory;
	public responseId = new CategoryController().getCategoryByAdminId;
	protected adminRoutes(): void {
		this.router.get("/category", this.response);
		this.router.get("/category/:id", this.responseId);
	}
}
