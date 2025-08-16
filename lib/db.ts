import mongoose from "mongoose";
import dotenv from "dotenv";

async function dbConnect() {
    try {
        dotenv.config();
        const MONGODB_URI = process.env.MONGODB_URI as string;
        if (!MONGODB_URI) {
            throw new Error("Please define the MONGODB_URI environment variable");
        }
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        throw new Error("Failed to connect to MongoDB");
    }
}

export default dbConnect;