import mongoose from "mongoose";
import Review from "../models/review.model";

export async function getAverageRating(productId: string) {
  try {
    const result = await Review.aggregate([
      {
        $match: { productId: new mongoose.Types.ObjectId(productId) },
      },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return result[0].averageRating;
    } else {
      return null; // No reviews found for the given productId
    }
  } catch (error) {
    console.error("Error getting average rating:", error);
    throw error;
  }
}
