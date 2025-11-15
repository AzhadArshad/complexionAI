// services/productAnalysis.service.js
import { openai } from "../config/openai.js";
import { getUserByAuthId } from "./user.service.js";
import fs from "fs";

export const analyzeProduct = async (ingredients, imagePath, auth_user_id) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  const imageDataUri = `data:image/jpeg;base64,${base64Image}`;

  const user = await getUserByAuthId("auth_user_123abc");
  if (!user || user.length === 0) {
    throw new Error("User not found");
  }
  const userProfile = user[0];

  const prompt = `
You are a professional dermatologist and skincare formulator.

User Profile:
- Skin type: Oily"}
- Main concerns: acne"} 
- Allergies/Sensitivities: None}

Ingredients extracted:
${ingredients}

Tasks:
1. Confirm the ingredient list looks complete and accurate
2. Highlight any potentially irritating, comedogenic, drying, or beneficial ingredients
3. Flag known allergens or controversial ingredients (e.g. fragrance, essential oils, denatured alcohol)
4. Give a compatibility score out of 100
5. Short summary: Is this product recommended for this user? Why?

Respond in clear, structured markdown.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.5,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: { url: imageDataUri },
          },
        ],
      },
    ],
    max_tokens: 1500,
  });

  return response.choices[0].message.content;
};
