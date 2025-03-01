import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    alias: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    clues: [
      {
        type: String,
        required: true,
      },
    ],
    funFacts: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Destination =
  mongoose.models.Destination ||
  mongoose.model("Destination", destinationSchema);

export default Destination;
