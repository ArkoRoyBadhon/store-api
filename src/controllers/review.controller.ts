import { Request, Response } from "express";
import Review from "../models/review.model";
import Customer from "../models/customer.model";
import Product from "../models/product.model";
import { getAverageRating } from "../utils/getAverageRating";

export const publishReview = async (req: Request, res: Response) => {
  try {
    const { productId, customerId, text, rating } = req.body;
    // checking productId and customerId validation
    const isCustomer = await Customer.find({ _id: customerId });
    if (!isCustomer) {
      return res.status(404).json({
        success: false,
        message: "Your customer id is invalid!",
      });
    }
    const hasProduct = await Product.find({ _id: productId });
    if (!hasProduct) {
      return res.status(404).json({
        success: false,
        message: "Your product id is invalid!",
      });
    }

    // adding new review
    const newReview = new Review({ productId, customerId, text, rating });
    await newReview.save();

    // making an average
    const average = await getAverageRating(productId);
    const fixedAverage = average.toFixed(2);

    // update the product
    await Product.findByIdAndUpdate(
      productId,
      { averageRating: fixedAverage },
      { new: true }
    );

    // rending the response
    res.status(201).json({
      success: true,
      message: "Review successfully added!",
      review: newReview,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: true,
      message: "Review successfully added!",
      reviews,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getSingleReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({
      success: true,
      message: "Review successfully retrieved!",
      review,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const updateSingleReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { text, rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({
      success: true,
      message: "Review successfully updated!",
      review: updatedReview,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteSingleReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
