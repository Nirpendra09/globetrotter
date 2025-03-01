import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Destination from "@/app/models/Destination";

export async function GET() {
  console.log("GET /api/destinations - Starting request handling");
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connection successful");

    // Get random destination
    console.log("Counting total destinations...");
    const count = await Destination.countDocuments();
    console.log(`Total destinations found: ${count}`);

    if (count === 0) {
      console.log("No destinations found in database");
      return NextResponse.json(
        { error: "No destinations found in database" },
        { status: 404 }
      );
    }

    const random = Math.floor(Math.random() * count);
    console.log(`Fetching random destination at index: ${random}`);
    const destination = await Destination.findOne().skip(random);

    if (!destination) {
      console.log("No destination found after skip");
      return NextResponse.json(
        { error: "No destinations found" },
        { status: 404 }
      );
    }

    console.log(`Found destination: ${destination.alias}`);

    // Get 3 random wrong options
    console.log("Fetching wrong options...");
    const wrongOptions = await Destination.aggregate([
      { $match: { _id: { $ne: destination._id } } },
      { $sample: { size: 3 } },
      { $project: { name: 1 } },
    ]);
    console.log(`Found ${wrongOptions.length} wrong options`);

    const options = [
      destination.name,
      ...wrongOptions.map((opt) => opt.name),
    ].sort(() => Math.random() - 0.5);

    console.log("Sending response with destination and options");
    return NextResponse.json({
      destination: {
        id: destination._id,
        alias: destination.alias,
        name: destination.name,
        clues: destination.clues,
        funFacts: destination.funFacts,
      },
      options,
    });
  } catch (error) {
    console.error("Error in GET /api/destinations:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// For seeding initial data
export async function POST(request: Request) {
  console.log("POST /api/destinations - Starting request handling");
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connection successful");

    const data = await request.json();
    console.log("Received data for seeding:", data);

    if (!Array.isArray(data)) {
      console.log("Data is not an array, expecting an array of destinations");
      return NextResponse.json(
        { error: "Invalid data format. Expected an array of destinations." },
        { status: 400 }
      );
    }

    console.log(`Inserting ${data.length} destinations...`);
    const destinations = await Destination.insertMany(data);
    console.log(`Successfully inserted ${destinations.length} destinations`);
    return NextResponse.json({ destinations }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/destinations:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  console.log("DELETE /api/destinations - Starting request handling");
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connection successful");

    console.log("Deleting all destinations...");
    const result = await Destination.deleteMany({});
    console.log(`Deleted ${result.deletedCount} destinations`);

    return NextResponse.json({
      message: `Deleted ${result.deletedCount} destinations`,
    });
  } catch (error) {
    console.error("Error in DELETE /api/destinations:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
