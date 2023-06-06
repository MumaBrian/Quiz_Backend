import { firebaseInstance } from "../firebase/";

export default class AuthorizationService {
	private db;

	public constructor() {
		this.db = firebaseInstance.firestore();
	}

	public async approveInstructorAccount(instructorId: string): Promise<void> {
		try {
			const instructors = this.db.collection("instructors");
			const docRef = instructors.doc(instructorId);

			await docRef.update({ approved: true });
		} catch (error) {
			console.log(error);
			throw new Error("Failed to approve instructor account");

		}
	}
}
