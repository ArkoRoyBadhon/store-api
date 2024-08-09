import { Router } from "express";
import {
  createTagController,
  getAllTagsController,
  getTagByIdController,
  updateTagController,
  deleteTagController,
} from "../controllers/tag.controller";

const router = Router();

router.post("/", createTagController);
router.get("/", getAllTagsController);
router.get("/:id", getTagByIdController);
router.patch("/:id", updateTagController);
router.delete("/:id", deleteTagController);

export default router;
