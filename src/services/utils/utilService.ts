import { firebaseInstance } from "../../firebase";
import * as admin from "firebase-admin";

export default class UtilService {
  private _firestoreDb: FirebaseFirestore.Firestore;
  private firestore: FirebaseFirestore.Firestore;

  constructor() {
	  this._firestoreDb = firebaseInstance.firestore();
	      this.firestore = admin.firestore();

  }

  // Gets a collection record data.
  public async getRecord(collectionName: string, documentId: string) {
    const record = (
      await this._firestoreDb.collection(collectionName).doc(documentId).get()
    ).data();
    return record;
  }

  public async createCollection(collectionName: string): Promise<void> {
    const collectionRef = this.firestore.collection(collectionName);

    try {
      await collectionRef.add({}); // Add a dummy document to create the collection
      console.log(`Collection '${collectionName}' created successfully.`);
    } catch (error) {
      console.error(`Error creating collection '${collectionName}':`, error);
      throw error;
    }
  }
}