import { CategoryController } from "../../controllers";
import express from "express";

export default class CategoryRoutes {
	public router: express.Router;

	constructor() {
		this.router = express.Router();
		this.createRoutes();
	}

	protected createRoutes(): void {
		this.router.post("/create/category", async (req, res, _next) => {
			try {
				const category = await new CategoryController().createCategory(
					req.body
				);
				res.json({ category });
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "Failed to create category" });
			}
		});

		this.router.get("/get/category-collection", async (req, res) => {
			try {
				const collectionName = req.query.collectionName;
				const records = await new CategoryController().getAllRecords(
          collectionName as string
				);

				res.send(records);
			} catch (e) {
				res.status(500).send({ error: "Failed to retrieve Collection" });
			}
		});

		this.router.get("/get/category-record", async (req, res) => {
			try {
				const collectionName = req.query.collectionName;
				const documentId = req.query.documentId;

				const record = await new CategoryController().getRecord(
          collectionName as string,
          documentId as string
				);

				res.send(record);
			} catch (e) {
				res.status(500).send({ error: "Failed to retrieve record" });
			}
		});

		this.router.put("/update/category-record", async (req, res, _next) => {
			try {
				const categoryId = req.query.categoryId;
				const updatedData = req.body;
				console.log("updatedData:", updatedData);
				console.log("body:", req.body);
				const result = await new CategoryController().updateCategory(
          categoryId as string,
          updatedData as any
				);
				res.json(result);
			} catch (e) {
				console.log(e);
				res.status(500).send({ error: "Failed to update category" });
			}
		});

		this.router.delete("/delete/category-record", async (req, res) => {
			try {
				const collectionName = req.query.collectionName;
				const documentId = req.query.documentId;
				console.log(collectionName);
				const record = await new CategoryController().deleteRecord(
          collectionName as string,
          documentId as string
				);

				// res.send(record);
			} catch (e) {
				res.status(500).send({ error: "Failed to delete record" });
			}
		});
	}
}
