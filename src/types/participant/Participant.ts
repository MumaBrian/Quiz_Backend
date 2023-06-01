export default interface Participant {
  DOB?: Date;
  createdAt?: string;
  email: string;
  firstName: string;
  id?: string;
  isVerified?: boolean;
  lastName: string;
  otp?: string;
  password: string;
  phoneNumber?: string;
  profilePic?: string;
  updatedAt?: string;
}
