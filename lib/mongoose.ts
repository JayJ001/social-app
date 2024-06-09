import mongoose from "mongoose";

let connected = false

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("No Database URL");

  if (connected) {
    console.log("Database already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    connected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
