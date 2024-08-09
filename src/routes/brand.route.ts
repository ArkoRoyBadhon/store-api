import { Router } from "express";
import {
  createBrandController,
  getAllBrandsController,
  getBrandByIdController,
  updateBrandController,
  deleteBrandController,
} from "../controllers/brand.controller";

const router = Router();

router.post("/", createBrandController);
router.get("/", getAllBrandsController);
router.get("/:id", getBrandByIdController);
router.patch("/:id", updateBrandController);
router.delete("/:id", deleteBrandController);

export default router;
