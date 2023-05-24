import { firebaseInstance } from "../../firebase";
import { Admin } from "../../types";

export default class AdminService {
	private db = firebaseInstance.firestore();
	private collections = this.db.collection("admins");

	public async createAdmin(admin: Admin): Promise<Admin> {
		const docRef = await this.collections.add(admin);
		const createdAdmin = { ...admin, id: docRef.id };
		return createdAdmin;
	}

	public async getAdminById(id: string): Promise<Admin | null> {
		const doc = await this.collections.doc(id).get();
		if (doc.exists) {
			return { id: doc.id, ...doc.data() } as Admin;
		}
		return null;
	}
}