
export default interface Participant {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string;
  otp?: string;
  profilePic?: string;
  isVerified?: boolean;
  DOB?: Date;
  createdAt?: string;
  updatedAt?: string;
}
