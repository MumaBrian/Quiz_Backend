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

}