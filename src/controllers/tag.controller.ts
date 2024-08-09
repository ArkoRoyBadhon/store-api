import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Tag from "../models/tag.model";
import sendResponse from "../utils/sendResponse";

export const createTagController = catchAsyncError(
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
      const newTag = await Tag.create({ label, value, image });

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Tag created successfully",
        data: newTag,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error creating tag",
        data: null,
        error: error,
      });
    }
  }
);

export const getAllTagsController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await Tag.find();

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Tags fetched successfully",
        data: tags,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching tags",
        data: null,
        error: error,
      });
    }
  }
);

export const getTagByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findById(id);

      if (!tag) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Tag not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Tag fetched successfully",
        data: tag,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error fetching tag",
        data: null,
        error: error,
      });
    }
  }
);

export const updateTagController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedTag = await Tag.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTag) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Tag not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Tag updated successfully",
        data: updatedTag,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error updating tag",
        data: null,
        error: error,
      });
    }
  }
);

export const deleteTagController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedTag = await Tag.findByIdAndDelete(id);

      if (!deletedTag) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Tag not found",
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Tag deleted successfully",
        data: deletedTag,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Error deleting tag",
        data: null,
        error: error,
      });
    }
  }
);
