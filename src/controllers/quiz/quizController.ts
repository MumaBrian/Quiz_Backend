import { QuizService } from "../../services";
import { Quiz } from "../../types";
import { Body, Delete,Get,Post,Put,Query, Route,Tags } from "tsoa";
export type CreateQuizType = Omit<Quiz, "id"| "instructorId" >;
import {UtilService} from "../../services"

@Route("/api/quiz")
@Tags("Quiz Creation controller Options")
export default class QuizController {
  @Post("/create/quiz")
	public async createQuiz(@Body() data: CreateQuizType): Promise<any> {
		return new QuizService().createQuiz(data);
	}

  @Get("/get/quiz-collection")
  public async getAllRecords(@Query() collectionName: string): Promise<any[]> {
  	try {
  		const records = await new UtilService().getCollection(collectionName);
  		return records;
  	} catch (error) {
  		throw new Error(`Error retrieving collection: ${error.message}`);
  	}
  }

  @Get("/get/quiz-record")
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

  @Delete("/delete/quiz-record")
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

  @Put("/update/quiz-record")
  public async updateQuiz(
    @Query("quizId") quizId: string,
    @Body() updatedData: CreateQuizType
  ): Promise<any> {
  	return new QuizService().updateQuiz(quizId, updatedData);
  }
  catch(e) {
  	console.log(e);
  	throw new Error("Failed to update quiz");
  }
}
	
