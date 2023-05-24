export default interface Instructor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string;
  profilePic?: string;
  otp?: string;
  isVerified?: boolean;
  resume: string;
  createdAt?: string;
  updatedAt?: string;
}
