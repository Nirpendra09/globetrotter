import mongoose from "mongoose";

// Use the MongoDB URI directly
const MONGODB_URI =
  "mongodb+srv://Nirpendra:Chaudhary09@cluster0.3wee3ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function checkTestDb() {
  try {
    console.log("Connecting to MongoDB test database...");
    await mongoose.connect(MONGODB_URI, {
      dbName: "test", // Connect to the test database
    });

    console.log("Connected to test database. Checking collections...");

    // Get the users collection
    const db = mongoose.connection.db;
    if (!db) {
      console.error("Failed to get database from connection");
      return;
    }

    const collections = await db.listCollections().toArray();
    console.log(
      "Available collections in test database:",
      collections.map((c) => c.name)
    );

    // Check if users collection exists
    const usersCollection = collections.find((c) => c.name === "users");
    if (usersCollection) {
      console.log("Users collection found in test database");

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

      // Drop the collection to start fresh
      console.log("Dropping users collection from test database...");
      await db.collection("users").drop();
      console.log("Users collection dropped successfully");
    } else {
      console.log("Users collection not found in test database");
    }

    console.log("Check completed");
  } catch (error) {
    console.error("Error checking test database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

checkTestDb();
