import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  googleId?: string; // optional
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    googleId: { type: String, unique: true, sparse: true }, // ✅ not required
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
