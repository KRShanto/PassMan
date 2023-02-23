import mongoose, { Schema, Types } from "mongoose";
import crypto from "crypto";

export interface IPassword {
  _id: string;
  userId: string;
  username: string;
  website?: string;
  password: string;
  iv: string;
  createdAt: Date;
}

const PasswordSchema: Schema = new Schema({
  userId: { type: Types.ObjectId, required: true, ref: "User" },
  username: { type: String, required: true },
  website: { type: String, required: false },
  password: { type: String, required: true },
  iv: { type: String, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
});

PasswordSchema.pre<IPassword>("save", function (next) {
  const password = this.password;

  // Generate a random initialization vector
  const iv = crypto.randomBytes(16);

  // Encrypt the password using AES-256-CBC encryption
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.PASSWORD_SALT as string),
    iv
  );
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Store the encrypted password
  this.password = encrypted;
  this.iv = iv.toString("hex");

  next();
});

const Password =
  mongoose.models.Password ||
  mongoose.model<IPassword>("Password", PasswordSchema);

export default Password;
