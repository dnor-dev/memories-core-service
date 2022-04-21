import mongoose, { Model, Schema } from "mongoose";
import { IPostMessage } from "../utils/interface";

const postSchema: Schema<IPostMessage> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  name: String,
  creator: String,
  tags: [String],
  selectedFile: {
    type: String,
    required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage: Model<IPostMessage> =
  mongoose.models.PostMessage || mongoose.model("PostMessage", postSchema);

export default PostMessage;
