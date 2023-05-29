
import { QuizSet } from "../../types";
import { QuizSetService } from "../../services";
import { Post, Route, Tags } from "tsoa";

@Route("/api/")
@Tags("QuizSet Controller Operations")
export default class QuizSetController {
  /**
   * Create a new quiz set
   */
  @Post("/quizSet")
  public async createQuizSet(quizSetData: QuizSet): Promise<QuizSet | undefined> {
    const result = await new QuizSetService().createQuizSet(quizSetData);
    return result;
  }
}





// import { QuizSet } from "../../types";
// import { QuizSetService } from "../../services";
// import { Body, Post, Route, Tags } from "tsoa";

// @Route("/api/")
// @Tags("QuizSet Controller Operations")
// export default class QuizSetController {
//   /**
//    * Test if API is available
//    */
//   // @Example<QuizSet>({
//   // 	msg: "pong"
//   // })
//   // @Get("/quizSet")
// 	// public getQuizSet(): QuizSet {
// 	// 	const result = new QuizSetService().getQuizSet();
// 	// 	return result;
// 	// }

//   /**
//    * Create a new quiz set
//    */
//   @Post("/quizSet")
//   public async createQuizSet(quizSetData: QuizSet): Promise<QuizSet | undefined> {
//     const result = await new QuizSetService().createQuizSet(quizSetData);
//     return result;
//   }
// }



// import { Request, Response } from "express";
// import { QuizSetService } from "../../services";
// import { QuizSet } from "../../types";

// // @Tags("Health Controller Operations")
// export default class QuizSetController {
//   private quizSetService: QuizSetService;

//   constructor() {
//     this.quizSetService = new QuizSetService();
//   }

// public  async createQuizSet(): QuizSet {(quizSetData: QuizSet){
//   return new QuizSetService().createQuizSet(quizSetData) 
// }
// }
// }