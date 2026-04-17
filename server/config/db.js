import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { connect, connection } = mongoose;

const connectDB = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );
    await connect(DB, {});
    console.log(`✅ Mongodb Connected at : ${connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;