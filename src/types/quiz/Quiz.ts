export default interface Quiz {
    quizId?:string;
    categoryId?:string;
    instructorId?:string;
    name:string;
    description:string;
    createdAt:string;
    updatedAt:string;
    createdBy?:string;
}