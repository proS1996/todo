import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    // Optionally throw an error to signal failure
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
