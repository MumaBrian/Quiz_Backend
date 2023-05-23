
export default interface Participant {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  profilePic?: string;
  DOB?: Date;
  createdAt: string;
  updatedAt: string;
}
