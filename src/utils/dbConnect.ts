import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async (callback?: () => void) => {
  try {
    await mongoose.connect(MONGO_URI);
    callback();
  } catch (error: any) {
    console.log(error.message);
  }
};

export default dbConnect;
