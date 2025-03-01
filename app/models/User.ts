import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    score: {
      correct: {
        type: Number,
        default: 0,
      },
      incorrect: {
        type: Number,
        default: 0,
      },
    },
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    lastPlayed: {
      type: Date,
      default: Date.now,
    },
    challenges: [
      {
        challengeId: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending",
        },
        score: {
          correct: {
            type: Number,
            default: 0,
          },
          incorrect: {
            type: Number,
            default: 0,
          },
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
