export default interface Quiz {
    quizId?:number;
    categoryId?:number;
    instructorId?:number;
    name:string;
    description:string;
    createdAt:string;
    updatedAt:string;
    createdBy?:string;
}