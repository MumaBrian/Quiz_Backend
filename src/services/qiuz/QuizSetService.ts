import { QuizSet } from "../../types";
import { firebaseInstance } from "../../firebase";

export default class QuizSetService {
    private db;

    constructor() {
       	this.db = firebaseInstance.firestore();
    }

    async createQuizSet(quizSetData: QuizSet): Promise<QuizSet | undefined> {
        try {
            const quizSetRef = await this.db.collection("quizSet").add({
                name: quizSetData.name,
                description: quizSetData.description,
                questions: quizSetData.questions,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const quizSetSnapshot = await quizSetRef.get();
            const newQuizSet = { id: quizSetSnapshot.id, ...quizSetSnapshot.data() } as QuizSet;
            return newQuizSet;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}


// import { firebaseInstance } from "../../firebase";
// import { QuizSet } from "../../types";

// export default class QuizSetService {
//     private db;

//     constructor() {
//         this.db = firebaseInstance.firestore();
//     }

//     async createQuizSet(quizSet: QuizSet): Promise<QuizSet> {
//         const docRef = await this.db.collection("quizsets").add(quizSet);
//         const snapshot = await docRef.get();
//         const newQuizSet = snapshot.data() as QuizSet;
//         return { ...newQuizSet, id: docRef.id };
//     }

//     async getQuizSetById(id: string): Promise<QuizSet | undefined> {
//         const docRef = this.db.collection("quizsets").doc(id);
//         const snapshot = await docRef.get();
//         if (!snapshot.exists) {
//             return undefined;
//         }
//         const quizSet = snapshot.data() as QuizSet;
//         return { ...quizSet, id };
//     }

//     async updateQuizSet(id: string, quizSetData: QuizSet): Promise<QuizSet | undefined> {
//         const docRef = this.db.collection("quizsets").doc(id);
//         const snapshot = await docRef.get();
//         if (!snapshot.exists) {
//             return undefined;
//         }
//         await docRef.update({
//             name: quizSetData.name,
//             description: quizSetData.description,
//             questions: quizSetData.questions,
//             updatedAt: new Date(),
//         });
//         const updatedQuizSet = { ...quizSetData, id };
//         return updatedQuizSet;
//     }
//     async deleteQuizSet(id: string): Promise<boolean> {
//         const docRef = this.db.collection("quizsets").doc(id);
//         const snapshot = await docRef.get();
//         if (!snapshot.exists) {
//             return false;
//         }
//         await docRef.delete();
//         return true;
//     }
// }