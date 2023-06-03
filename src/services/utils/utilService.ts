import { firebaseInstance } from "../../firebase";

export default class UtilService {
	private _firestoreDb: FirebaseFirestore.Firestore;
	constructor() {
		this._firestoreDb = firebaseInstance.firestore();
	}
	//Get Collection data
	public async getCollection(collectionName: string) {
		const collectionSnapshot = await this._firestoreDb
			.collection(collectionName)
			.get();
		const records = collectionSnapshot.docs.map((doc) => doc.data());
		return records;
	}

	// Gets a collection record data.
	public async getRecord(collectionName: string, documentId: string) {
		const record = (
			await this._firestoreDb.collection(collectionName).doc(documentId).get()
		).data();
		return record;
	}

	//Update a record data
	public async updateRecord(
		collectionName: string,
		documentId: string,
		newData: any
	): Promise<any> {
		const recordRef = this._firestoreDb
			.collection(collectionName)
			.doc(documentId);

		const currentData = (await recordRef.get()).data();

		const updatedData = {
			...currentData,
			...newData,
		};

		await recordRef.update(updatedData);

		const updatedRecord = (await recordRef.get()).data();

		return updatedRecord;
	}

	//Delete a record data
	public async deleteRecord(collectionName: string, documentId: string) {
		await this._firestoreDb.collection(collectionName).doc(documentId).delete();
	}
}