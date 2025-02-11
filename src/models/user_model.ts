import { Schema, model } from "mongoose";
import { IUser } from "../types/interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAccountVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiresAt: { type: Number, default: 0 },
    resetOtp: { type: String, default: '' },
    resetOtpExpiresAt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
