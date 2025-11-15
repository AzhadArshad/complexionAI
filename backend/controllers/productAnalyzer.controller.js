import { extractIngredients } from "../services/ingredientExtractor.service.js";
import { analyzeProduct } from "../services/productAnalysis.service.js";
import { getUserByAuthId } from "../services/user.service.js";

export const analyzeProductController = async (req, res) => {
  try {
    const authId = req.body.auth_user_id;
    const imagePath = req.file.path;

    // Fetch user skin profile
    const user = await getUserByAuthId(authId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Extract ingredients from image
    const ingredients = await extractIngredients(imagePath);

    // Analyze compatibility
    const analysis = await analyzeProduct(ingredients, user);

    res.json({
      status: "success",
      ingredients_extracted: ingredients,
      analysis,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
