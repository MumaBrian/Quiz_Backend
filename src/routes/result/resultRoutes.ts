import { ResultService } from "../../services/";
import {ResultController } from "../../controllers";
import express from "express";


export default class ResultRoutes {
	public router: express.Router;

	constructor() {
		this.router = express.Router();
		this.createRoutes();
	}
 
	protected createRoutes(): void {
		this.router.post("/result", async (req, res, _next) => {
			try {
				const result = await new ResultController().createResult(req.body);
				res.json({ result });
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "Failed to store result" });
			}
		});

		// Download result as PDF endpoint
		this.router.get("/pdf-download/", async (req, res, _next) => {
			try {
				const resultId = req.query.id;
				
				const result = await new ResultController().getResult(resultId as string);

				if (!result) {
					res.status(404).send({ error: "Result not found" });
					return;
				}

				const pdfBytes = await new ResultService().generatePDF(result);
				const fileName = `result_${resultId}.pdf`;

				res.setHeader(
					"Content-Disposition",
					`attachment; filename="${fileName}"`
				);
				res.setHeader("Content-Type", "application/pdf");
				res.send(pdfBytes);
			} catch (e) {
				console.log(e);
				res.status(500).send({ error: "Failed to download result" });
			}
		});
	}
}