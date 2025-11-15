// controllers/productAnalyzer.controller.js
import { extractIngredients } from "../services/ingredientExtractor.service.js";
import { analyzeProduct } from "../services/productAnalysis.service.js";
import { getUserByAuthId } from "../services/user.service.js";

export const analyzeProductController = async (req, res) => {
  try {
    const authId = req.body.auth_user_id;
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = req.file.path;

    // Step 1: Extract ingredients
    const ingredients = await extractIngredients(imagePath);

    // Step 2: Full analysis
    const analysis = await analyzeProduct(ingredients, imagePath, authId);

    res.json({
      status: "success",
      ingredients_extracted: ingredients,
      analysis,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ error: err.message || "Analysis failed" });
  }
};
