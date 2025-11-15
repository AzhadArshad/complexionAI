// services/ingredientExtractor.service.js
import { openai } from "../config/openai.js";
import fs from "fs";

export const extractIngredients = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  const imageDataUri = `data:image/jpeg;base64,${base64Image}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "You are a skincare ingredient expert. Extract and list ALL ingredients from this product label exactly as written, in order, one per line. Do not summarize or explain yet — just extract raw ingredients.",
          },
          {
            type: "image_url",
            image_url: {
              url: imageDataUri,
            },
          },
        ],
      },
    ],
    max_tokens: 1000,
  });

  return response.choices[0].message.content.trim();
};
