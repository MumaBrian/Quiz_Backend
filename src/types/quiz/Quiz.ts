import { Question } from "../../types";

export default interface Quiz {
  // categoryId: string;
  description?: string;
  id?: string;
  // instructorId: string;
  questions?: Array<Question>;
  title?: string;
  
}