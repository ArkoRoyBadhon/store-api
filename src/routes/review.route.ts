import { Router } from "express";
import {
  deleteSingleReview,
  getAllReviews,
  getSingleReview,
  publishReview,
  updateSingleReview,
} from "../controllers/review.controller";

const router = Router();

// Create a review
router.post("/reviews", publishReview);
// Read all reviews
router.get("/reviews", getAllReviews);
// Read a review by ID
router.get("/reviews/:id", getSingleReview);
// Update a review by ID
router.patch("/reviews/:id", updateSingleReview);
// Delete a review by ID
router.delete("/reviews/:id", deleteSingleReview);

export default router;
