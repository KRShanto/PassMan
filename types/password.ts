export interface PasswordType {
  _id: string;
  userId: string;
  username: string;
  website?: string;
  password: string;
  createdAt: Date;
}
