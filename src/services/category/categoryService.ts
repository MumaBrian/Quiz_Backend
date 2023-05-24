import { firebaseInstance } from "../../firebase";
import { Category} from "../../types";

export default class CategoryService {
	private db = firebaseInstance.firestore();
	private collection = this.db.collection("category");

	public async createCategory(category: Category): Promise<Category> {
		const docRef = await this.collection.add(category);
		const createdCategory = { ...category, id: docRef.id };
		return createdCategory;
	}

	public async getCategoriesByAdminId(adminId: string): Promise<Category[]> {
		const querySnapshot = await this.collection
			.where("adminId", "==", adminId)
			.get();
		const categories: Category[] = [];
		querySnapshot.forEach((doc) => {
			categories.push({ id: doc.id, ...doc.data() } as Category);
		});
		return categories;
	}
}