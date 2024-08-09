import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
