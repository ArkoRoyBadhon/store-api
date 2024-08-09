import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Category from "../models/category.model";
import sendResponse from "../utils/sendResponse";

export const createCategoryController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return sendResponse(res, {
        statusCode: 422,
        success: false,
        message: firstError,
        data: null,
      });
    }

    const { label, value,image } = req.body;

    try {
      const newCategory = await Category.create({ label, value, image });

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error creating category",
        data: null,
        error: error,
      });
    }
  }
);

export const getAllCategoriesController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await Category.find();
      

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Categories fetched successfully",
        data: categories
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching categories",
        data: null,
        error: error,
      });
    }
  }
);

export const getCategoryByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Category not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category fetched successfully",
        data: category,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching category",
        data: null,
        error: error,
      });
    }
  }
);

export const updateCategoryController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      console.log("sssssss", updateData)

      const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedCategory) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Category not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error updating category",
        data: null,
        error: error,
      });
    }
  }
);

export const deleteCategoryController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Category not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category deleted successfully",
        data: deletedCategory,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error deleting category",
        data: null,
        error: error,
      });
    }
  }
);
