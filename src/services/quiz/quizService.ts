import { firebaseInstance } from "../../firebase";
import  {CreateQuestionType}  from "../../controllers/quiz/quizController";
// import  {CreateQuizType}  from "../../controllers/quiz/quizController";
import otpGenerator from "otp-generator";
import { Quiz } from "@types";

export default class QuizService {
	private db;

	public constructor() {
		this.db = firebaseInstance.firestore();
	}

	private genUUID() {
		const uuid = otpGenerator.generate(32, {
			upperCaseAlphabets: true,
			specialChars: false,
			lowerCaseAlphabets: true,
		});

		return uuid;
	}

	public async createQuiz(data: Quiz): Promise<any> {
		try {
			const uuid = this.genUUID();

			const quiz = {
				id: uuid,
				title: data.title,
				description: data.description,
				questions:data.questions
			};

			const quizzes = this.db.collection("quizzes");
			const docRef = quizzes.doc(uuid);
			const result = await docRef.set(quiz);
			return result;
		} catch (error) {
			return {
				error: "Please enter the required info",
			};
		}
	}

	public async createQuestion(data: CreateQuestionType): Promise<any> {
		try {
			const uuid = this.genUUID();

			const question = {
				id: uuid,
				answerA: data.answerA,
				answerB: data.answerB,
				answerC: data.answerC,
				answerD: data.answerD,
				correctAnswer: data?.correctAnswer,
				question: data.question,
			};

			const questions = this.db.collection("questions");
			const docRef = questions.doc(uuid);
			const result = await docRef.set(question);
			return result;
		} catch (error) {
			return {
				error: "Please enter the required info",
			};
		}
	}

	// public async createAnswer(data: {
	// answer: string;
	// questionId: string;
	// }): Promise<any> {
		
	// 	try {
	// 		const uuid = this.genUUID();

	// 		const answer = {
	// 			id: uuid,
	// 			answer: data.answer,
	// 			questionId: data.questionId,
	// 		};

	// 		const answers = this.db.collection("answers");
	// 		const docRef = answers.doc(uuid);
	// 		const result = await docRef.set(answer);
	// 		return result;
	// 	} catch (error) {
	// 		return {
	// 			error: "Please enter the required info",
	// 		};
	// 	}
	// }
}