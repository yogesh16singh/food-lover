import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export default async () => {
  return mongoose.connect(process.env.MANGODB_URL);
};
