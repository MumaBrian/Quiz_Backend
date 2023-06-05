import { QuizController } from "../../controllers";
import express from "express";

export default class QuizRoutes {
	public router: express.Router;

	constructor() {
		this.router = express.Router();
		this.createRoutes();
	}
 
	protected createRoutes(): void {

		this.router.post("/create/quiz", async (req, res, _next) => {
			try {
				const quiz = await new QuizController().createQuiz(req.body);
				res.json({ quiz });
				// res.status(201).send(quiz);
			} catch (e) {
				console.log(e);

				res.status(500).send({ error: "Failed to create quiz" });
			}
		});
    
		

		this.router.get("/get/quiz-collection", async (req, res) => {
			try {
				const collectionName=req.query.collectionName
				const records = await new QuizController().getAllRecords(collectionName as string);

				res.send(records);
				
			} catch (e) {
				res.status(500).send({ error: "Failed to retrieve Collection" });

			}

		})

		
		this.router.get("/get/quiz-record",
			async (req, res) => {

				try {
					const collectionName = req.query.collectionName;
					const documentId = req.query.documentId;
					
					const record = await new QuizController().getRecord(
						collectionName as string,
						documentId as string
					);

					res.send(record);
				} catch (e) {
					res.status(500).send({ error: "Failed to retrieve record" });
				}
			}
		);

		this.router.put("/update/quiz-record", async (req, res, _next) => {
			try {
				const quizId = req.query.quizId;
				const updatedData = req.body;
				console.log("updatedData:", updatedData)
				console.log("body:",req.body)
				const result = await new QuizController().updateQuiz(
					quizId as string,
					updatedData as any
				);
				res.json(result);
				// res.send()
			} catch (e) {
				console.log(e);
				res.status(500).send({ error: "Failed to update quiz" });
			}
		});




		this.router.delete("/delete/quiz-record", async (req, res) => {
			try {
				const collectionName = req.query.collectionName;
				const documentId = req.query.documentId;
				console.log(collectionName)
				const record = await new QuizController().deleteRecord(
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








