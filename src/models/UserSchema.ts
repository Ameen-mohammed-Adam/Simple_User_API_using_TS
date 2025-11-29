import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
require("dotenv").config();

// 1. Define TypeScript interface for the user
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Create the schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    role: {
      type: String,
      enum: ["admin", "user"],
      defualt: "user",
    },
  },
  { timestamps: true }
);

// 3. Pre-save hook to hash password
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = parseInt(process.env.SALT_FOR_PASSWORD || "10");
  this.password = await bcrypt.hash(this.password, salt);
});

// 4. Create model
export const User = mongoose.model<IUser>("User", UserSchema);
