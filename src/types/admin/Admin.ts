
import { firebaseInstance } from "../../firebase";

export default interface Admin {
  id: string;
  email: string;
  name: string;
  password: string;
}

export default class AdminModel {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = firebaseInstance.firestore();
  }

  public async createAdmin(admin: Admin): Promise<void> {
    await this.db.collection("admins").doc(admin.id).set(admin);
  }

  public async getAdminById(id: string): Promise<Admin | null> {
    const snapshot = await this.db.collection("admins").doc(id).get();
    if (snapshot.exists) {
      const admin = snapshot.data() as Admin;
      return admin;
    }
    return null;
  }
}
