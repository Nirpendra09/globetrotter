import mongoose from "mongoose";

// Use the MongoDB URI directly
const MONGODB_URI =
  "mongodb+srv://Nirpendra:Chaudhary09@cluster0.3wee3ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function fixIndexes() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      dbName: "globetrotter", // Specify the database name
    });

    console.log("Connected to MongoDB. Checking collections...");

    // Get the users collection
    const db = mongoose.connection.db;
    if (!db) {
      console.error("Failed to get database from connection");
      return;
    }

    const collections = await db.listCollections().toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // Check if users collection exists
    const usersCollection = collections.find((c) => c.name === "users");
    if (!usersCollection) {
      console.log("Users collection not found. No need to fix indexes.");
      return;
    }

    // Get indexes on users collection
    const indexes = await db.collection("users").indexes();
    console.log("Current indexes on users collection:", indexes);

    // Check if email index exists
    const emailIndex = indexes.find(
      (idx) => idx.key && idx.key.email !== undefined
    );

    if (emailIndex && emailIndex.name) {
      console.log("Found email index:", emailIndex);
      console.log("Dropping email index...");

      await db.collection("users").dropIndex(emailIndex.name);
      console.log("Email index dropped successfully");
    } else {
      console.log("No email index found on users collection");
    }

    // Check if the collection is empty and drop it if needed
    const count = await db.collection("users").countDocuments();
    console.log(`Users collection has ${count} documents`);

    if (count === 0) {
      console.log("Users collection is empty, dropping it to start fresh");
      await db.collection("users").drop();
      console.log("Users collection dropped");
    }

    console.log("Index fix completed");
  } catch (error) {
    console.error("Error fixing indexes:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

fixIndexes();
