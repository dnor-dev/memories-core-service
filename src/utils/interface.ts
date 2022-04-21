import { Document } from "mongoose";

export interface IPostMessage extends Document {
  title: string;
  message: string;
  name: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likes: string[];
  comments: string[];
  createdAt: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  id: string;
}
