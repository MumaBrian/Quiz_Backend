import { firebaseInstance } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { Result } from "../../types";
import { PDFDocument } from "pdf-lib";


export default class CategoryService {
	private db;

	public constructor() {
		this.db = firebaseInstance.firestore();
	}

	private genUUID() {
		const uuid = uuidv4();

		return uuid;
	}

	public async createResult(data: Result): Promise<any> {
		try {
			const uuid = this.genUUID();
			const quizId = this.genUUID();

			const result= {
				id: uuid,
				score: data.score,
				quizId:quizId
			};

			const categories = this.db.collection("results");
			const docRef = categories.doc(uuid);
			const results = await docRef.set(result);
			return results;
		} catch (error) {
			return {
				error: "Please enter the required info to create results",
			};
		}
	}

	
	public async  generatePDF(result: Result): Promise<Buffer> {
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage();
		const { width, height } = page.getSize();

		page.drawText(`Result ID: ${result.id}`, { x: 50, y: height - 50 });
		page.drawText(`Score: ${result.score}`, { x: 50, y: height - 100 });
		page.drawText(`Quiz ID: ${result.quizId}`, { x: 50, y: height - 150 });

		const pdfBytes = await pdfDoc.save();
		return Buffer.from(pdfBytes);
	}

}
