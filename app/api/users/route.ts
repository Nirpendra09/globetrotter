import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

// Create a new user
export async function POST(request: Request) {
  try {
    console.log("Starting user creation process...");
    await connectDB();
    const data = await request.json();
    console.log("Received user data:", data);

    if (!data.username) {
      console.log("Username missing in request");
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check if username already exists
    console.log("Checking for existing username:", data.username);
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      console.log("Username already exists:", data.username);
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 }
      );
    }

    console.log("Creating new user with username:", data.username);
    const user = await User.create({
      username: data.username,
      score: data.score || { correct: 0, incorrect: 0 },
      gamesPlayed: data.score ? 1 : 0,
      lastPlayed: new Date(),
      challenges: [],
    });

    console.log("User created successfully:", user);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    // Log the full error details
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Get user by username
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
