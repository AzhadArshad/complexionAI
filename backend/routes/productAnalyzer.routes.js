import express from "express";
import { analyzeProductController } from "../controllers/productAnalyzer.controller.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/analyze-product",
  upload.single("image"),
  analyzeProductController
);

export default router;
