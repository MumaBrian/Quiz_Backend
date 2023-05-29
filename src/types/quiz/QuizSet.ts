export default interface QuizSet {
    id?: string;
  name: string;
  description: string;
  questions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}