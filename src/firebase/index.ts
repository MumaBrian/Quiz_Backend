import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
const serviceAccount = require("./sdk/quiz-app-firebase-adminsdk.json");

class FirebaseSetup {
  private _app;
  public constructor() {
    this._app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  public firestore() {
    return getFirestore(this._app);
  }

  public init() {
    console.log("Firebase has been initialised.");
  }
}

export const firebaseInstance = new FirebaseSetup();
