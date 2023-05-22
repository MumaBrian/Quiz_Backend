export default interface Instructor {
  id: string;
  email: string;
  firstName: string;
  lastname: string;
  password: string;
  phoneNumber?: string;
  profilePic?: string;
  resume: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
