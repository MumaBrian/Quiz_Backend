import { QuizService } from "../../services";
import { Question, Quiz } from "../../types";
import { Body, Delete,Get, Post,Query, Route,Tags } from "tsoa";
export type CreateQuizType = Omit<Quiz, "instructorId" | "id" | "categoryId">;
export type CreateQuestionType = Omit<Question, "quizId" | "id">;
import {UtilService} from "../../services"

@Route("/api/quiz")
@Tags("Quiz Creation controller Options")
export default class QuizController {
  @Post("/create/quiz")
	public async createQuiz(@Body() data: CreateQuizType): Promise<any> {
		return new QuizService().createQuiz(data);
	}

  @Get("/get/collection")
  public async getAllRecords(@Query() collectionName: string): Promise<any[]> {
  	try {
  		const records = await new UtilService().getCollection(collectionName);
  		return records;
  	} catch (error) {
  		throw new Error(`Error retrieving collection: ${error.message}`);
  	}
  }

  @Get("/get/record")
  public async getRecord(
    @Query("collectionName") collectionName: string,
    @Query("documentId") documentId: string
  ): Promise<any> {
  	try {
  		const record = await new UtilService().getRecord(
  			collectionName,
  			documentId
  		);
  		return record;
  	} catch (error) {
  		throw new Error(`Error retrieving record: ${error.message}`);
  	}
  }

  @Delete("/delete/record")
  public async deleteRecord(
    @Query("collectionName") collectionName: string,
    @Query("documentId") documentId: string
  ): Promise<any> {
  	try {
  		const record = await new UtilService().deleteRecord(
  			collectionName,
  			documentId
  		);
  		return record;
  	} catch (error) {
  		throw new Error(`Error deleting record: ${error.message}`);
  	}
  }
}
