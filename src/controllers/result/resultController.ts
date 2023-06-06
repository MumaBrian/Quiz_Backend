import { Result} from "../../types";
import { Body, Get, Post,Query, Route, Tags } from "tsoa";
export type CreateResultType = Omit<Result, "id"|"quizId">;
import { ResultService } from "../../services";
import { firebaseInstance } from "../../firebase";

@Route("/api/result")
@Tags("Result Creation controller Option")
export default class ResultController {
	private db;

	public constructor() {
		this.db = firebaseInstance.firestore();
	}
  @Post("/result")
	public async createResult(@Body() data: CreateResultType): Promise<any> {
		return new ResultService().createResult(data);
	}
@Get("/pdf-download")
  public async getResult(@Query()id: string): Promise<Result | null> {
  	try {
  		const docRef = this.db.collection("results").doc(id);
  		const snapshot = await docRef.get();
  		if (snapshot.exists) {
  			return snapshot.data() as Result;
  		} else {
  			return null;
  		}
  	} catch (error) {
  		return null;
  	}
  }
}
