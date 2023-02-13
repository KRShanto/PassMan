import mongoose, { Schema, Types } from "mongoose";

export interface IPassword {
  _id: string;
  userId: string;
  title: string; // Title/username of the password
  website?: string;
  password: string;
  createdAt: Date;
}

const PasswordSchema: Schema = new Schema({
  userId: { type: Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  website: { type: String, required: false },
  password: { type: String, required: true },
  createdAt: { type: Date, required: false, default: Date.now },
});

// export default mongoose.model<IPassword>("Password", PasswordSchema);

const Password =
  mongoose.models.Password ||
  mongoose.model<IPassword>("Password", PasswordSchema);

export default Password;
