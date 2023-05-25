export default interface Question{
    id?:string;
    quizId?:string;
    question:string;
    answerA:string;
    answerB:string;
    answerC:string;
    answerD:string;
    correctAnswer?:string;
}