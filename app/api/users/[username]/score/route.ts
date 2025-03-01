import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    console.log(`Updating score for user: ${params.username}`);
    await connectDB();
    const data = await request.json();
    console.log("Received score data:", data);

    if (
      !data.score ||
      typeof data.score.correct !== "number" ||
      typeof data.score.incorrect !== "number"
    ) {
      console.log("Invalid score data:", data);
      return NextResponse.json(
        { error: "Invalid score data" },
        { status: 400 }
      );
    }

    // Also update gamesPlayed and lastPlayed
    const updateData = {
      score: data.score,
      lastPlayed: new Date(),
      $inc: { gamesPlayed: 1 },
    };

    console.log(`Finding user ${params.username} to update score`);
    const user = await User.findOneAndUpdate(
      { username: params.username },
      updateData,
      { new: true }
    );

    if (!user) {
      console.log(`User not found: ${params.username}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(
      `Score updated successfully for ${params.username}:`,
      user.score
    );
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in PUT /api/users/[username]/score:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
