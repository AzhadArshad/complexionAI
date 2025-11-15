import { openai } from "../config/openai.js";
import fs from "fs";

export const extractIngredients = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Extract all skincare product ingredients from the image. Output only text.",
      },
      {
        role: "user",
        content: [
          { type: "input_text", text: "Here is the product label:" },
          {
            type: "input_image",
            image: imageBuffer.toString("base64"),
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content;
};
