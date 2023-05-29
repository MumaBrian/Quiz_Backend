export default interface Admin {
  Name: string;
  email: string;
  id?: string;
  isVerified?: boolean;
  otp?: string;
  password: string;
}

