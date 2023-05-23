import { firebaseInstance } from "../../firebase";
import { Admin } from "../../types";
import { UtilService } from "../../services";

export default class AdminService {
  private firestoreUtilService: UtilService;

  constructor() {
    this.firestoreUtilService = new UtilService();
  }

  async createAdminCollection(admin: Admin): Promise<void> {
    const adminCollectionName = "Admin";

    try {
      await this.firestoreUtilService.createCollection(adminCollectionName);

      // Additional logic to add admin document if needed

      console.log(`Admin collection created successfully.`);
    } catch (error) {
      console.error(`Error creating admin collection:`, error);
      throw error;
    }
  }
}
