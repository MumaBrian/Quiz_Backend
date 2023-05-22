
import { firebaseInstance } from "../../firebase";

export default interface Admin {
  id?: string;
  email: string;
  name: string;
  password: string;
}

