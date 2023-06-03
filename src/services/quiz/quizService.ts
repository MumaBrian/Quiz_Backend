import { firebaseInstance } from "../../firebase";
import  {CreateQuestionType}  from "../../controllers/quiz/quizController";
// import  {CreateQuizType}  from "../../controllers/quiz/quizController";
import otpGenerator from "otp-generator";
import { Quiz } from "../../types";

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
				questions: data.questions,
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
				error: "Please enter the required information",
			};
		}
	}

	public async updateQuiz(quizId: string, updatedData: Quiz): Promise<any> {
		try {
			const quizzes = this.db.collection("quizzes");
			const docRef = quizzes.doc(quizId);
			console.log(docRef)
			console.log("quizId:", quizId);

			// Retrieve the existing quiz from the database
			const doc = await docRef.get();
			console.log("quizId:", doc);

			if (!doc.exists) {
				throw new Error("Quiz not found");
			}

			// Make the necessary changes to the quiz
			const existingQuiz = doc.data() //as Quiz;
			const updatedQuiz: Quiz = {
				...existingQuiz,
				...updatedData,
			};
			console.log("update:",updatedQuiz)
			console.log("data:",updatedData)
			// Update the quiz in the database
			const result = await docRef.update(updatedQuiz);

			return result;
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}
}