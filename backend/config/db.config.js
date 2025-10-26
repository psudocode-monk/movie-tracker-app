import mongoose from "mongoose";

const connectDb = async () => {
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Database connected to ${db.connection.host}`);
};

export default connectDb;
