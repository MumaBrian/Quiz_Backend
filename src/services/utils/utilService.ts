import { firebaseInstance } from "../../firebase";

export default class UtilService {
	private _firestoreDb: FirebaseFirestore.Firestore;
	constructor() {
		this._firestoreDb = firebaseInstance.firestore()
	}

	// Gets a collection record data.
	public async getRecord(collectionName: string, documentId: string) {
		const record = (await this._firestoreDb.collection(collectionName).doc(documentId).get()).data();
		return record
	}
}