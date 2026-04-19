import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    hairstyleId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    matchScore: { type: Number, required: true },
    tags: [{ type: String, required: true }],
  },
  { _id: false },
);

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      enum: ["Mehndi", "Baraat", "Walima"],
      required: true,
    },
    hairLength: {
      type: String,
      enum: ["Short", "Medium", "Long"],
      required: true,
    },
    image: { type: String, required: true },
    recommendedHairstyle: { type: recommendationSchema, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export const Booking = mongoose.model("Booking", bookingSchema);
