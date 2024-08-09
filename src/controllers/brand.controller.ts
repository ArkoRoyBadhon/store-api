import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Brand from "../models/brand.model";
import sendResponse from "../utils/sendResponse";

export const createBrandController = catchAsyncError(
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

    const { label, value, image } = req.body;

    try {
      const newBrand = await Brand.create({ label, value, image });

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Brand created successfully",
        data: newBrand,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error creating brand",
        data: null,
        error: error,
      });
    }
  }
);

export const getAllBrandsController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brands = await Brand.find();

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Brands fetched successfully",
        data: brands
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching brands",
        data: null,
        error: error,
      });
    }
  }
);

export const getBrandByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const brand = await Brand.findById(id);

      if (!brand) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Brand not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Brand fetched successfully",
        data: brand,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching brand",
        data: null,
        error: error,
      });
    }
  }
);

export const updateBrandController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedBrand) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Brand not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Brand updated successfully",
        data: updatedBrand,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error updating brand",
        data: null,
        error: error,
      });
    }
  }
);

export const deleteBrandController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedBrand = await Brand.findByIdAndDelete(id);

      if (!deletedBrand) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Brand not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Brand deleted successfully",
        data: deletedBrand,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error deleting brand",
        data: null,
        error: error,
      });
    }
  }
);
