import { Question } from "../../types";

export default interface Quiz {
  description?: string;
  id?: string;
  questions?: Array<Question>;
  title?: string;
  
}