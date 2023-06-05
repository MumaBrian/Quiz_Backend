import { firebaseInstance } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../types";

export default class CategoryService {
	private db;

	public constructor() {
		this.db = firebaseInstance.firestore();
	}

	private genUUID() {
		const uuid = uuidv4();

		return uuid;
	}

	public async createCategory(data: Category): Promise<any> {
		try {
			const uuid = this.genUUID();

			const category= {
				id: uuid,
				title: data.title,
				description: data.description,
			};

			const categories = this.db.collection("categories");
			const docRef = categories.doc(uuid);
			const result = await docRef.set(category);
			return result;
		} catch (error) {
			return {
				error: "Please enter the required info to create category",
			};
		}
	}

	public async updateCategory(CategoryId: string, updatedData: Category): Promise<any> {
		try {
			const categories = this.db.collection("categories");
			const docRef = categories.doc(CategoryId);
			console.log(docRef);
			console.log("categoryId:", CategoryId);

			// Retrieve the existing category from the database
			const doc = await docRef.get();
			console.log("Category:", doc);

			if (!doc.exists) {
				throw new Error("Category not found");
			}

			// Make the necessary changes to the category
			const existingCategory = doc.data(); //as category;
			const updatedCategory: Category = {
				...existingCategory,
				...updatedData,
			};
			console.log("update:", updatedCategory);
			console.log("data:", updatedData);
			// Update the category in the database
			const result = await docRef.update(updatedCategory);

			return result;
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}
}
