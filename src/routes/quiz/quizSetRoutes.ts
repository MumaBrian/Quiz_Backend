import { QuizSet } from "../../types";
import  {QuizSetService} from "../../services";
import express from "express";

// @Route("quizSet")
export default class QuizSetRoutes {
	public router: express.Router;
	private quizSetService: QuizSetService;

	constructor() {
		this.router = express.Router();
		this.quizSetService = new QuizSetService();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.post("/quizsets", async (req, res) => {
			try {
				const quizSetData = req.body as QuizSet;
				const newQuizSet = await this.quizSetService.createQuizSet(quizSetData);
				res.status(201).json(newQuizSet);
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: "Internal server error" });
			}
		});
	}
}
// import express, { Request, Response } from "express";
// import { QuizSet } from "../../types/quiz/quizSet";
// import QuizSetService from "../../services/qiuz/QuizSetService";

// const app = express();
// const service = new QuizSetService();

// app.use(express.json());

// app.post("/quizsets", async (req: Request, res: Response) => {
//     try {
//         const quizSet = req.body as QuizSet;
//         const newQuizSet = await service.createQuizSet(quizSet);
//         res.status(201).json(newQuizSet);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });   }
// 	});

// 	app.get("/quizsets/:id", async (req: Request, res: Response) => {
// 		try {
// 			const id = req.params.id;
// 			const quizSet = await service.getQuizSetById(id);
// 			if (quizSet) {
// 				res.status(200).json(quizSet);
// 			} else {
// 				res.status(404).json({ error: "QuizSet not found" });
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).json({ error: "Internal server error" });
// 		}
// 	});

// 	app.put("/quizsets/:id", async (req: Request, res: Response) => {
// 		try {
// 			const id = req.params.id;
// 			const quizSetData = req.body as QuizSet;
// 			const quizSet = await service.updateQuizSet(id, quizSetData);
// 			if (quizSet) {
// 				res.status(200).json(quizSet);
// 			} else {
// 				res.status(404).json({ error: "QuizSet not found" });
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).json({ error: "Internal server error" });
// 		}
// 	});
	
// 	app.delete("/quizsets/:id", async (req: Request, res: Response) => {
// 		try {
// 			const id = req.params.id;
// 			const deletedQuizSet = await service.deleteQuizSet(id);
// 			if (deletedQuizSet) {
// 				res.status(200).json(deletedQuizSet);
// 			} else {
// 				res.status(404).json({ error: "QuizSet not found" });
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).json({ error: "Internal server error" });
// 		}
// 	});
	
	
