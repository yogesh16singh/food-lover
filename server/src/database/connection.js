import mongoose from "mongoose";

export default async () => {
  return mongoose.connect("mongodb+srv://foodLover:foodLover@cluster0.yubjsmq.mongodb.net/?retryWrites=true&w=majority");
};
