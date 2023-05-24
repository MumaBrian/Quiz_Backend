import { Request, Response } from "express";
import { CategoryService } from "../../services";
import { Category } from "../../types";

export default class CategoryController {
	public async createCategory(req: Request, res: Response) {
		try {
			const categoryData: Category = req.body;
			const createdCategory = await new CategoryService().createCategory(categoryData);
			res.status(201).json(createdCategory);
		} catch (error) {
			console.error("Error creating category:", error);
			res.status(500).json({ error: "Failed to create category" });
		}
	}

	public async getCategoryByAdminId(req: Request, res: Response) {
		try {
			const adminId: string = req.params.adminId;
			const categories = await new CategoryService().getCategoriesByAdminId(adminId);
			res.json(categories);
		} catch (error) {
			console.error("Error getting categories:", error);
			res.status(500).json({ error: "Failed to get categories" });
		}
	}
}