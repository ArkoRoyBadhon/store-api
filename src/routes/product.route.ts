import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.patch("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
