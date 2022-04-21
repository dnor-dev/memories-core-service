import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../utils/interface";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
  },
  { timestamps: true },
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
