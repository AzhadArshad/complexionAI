import { openai } from "../config/openai.js";

export const analyzeProduct = async (ingredients, user) => {
  const userProfile = `
Skin Type: ${user.skin_type}
Skin Tone: ${user.skin_tone}
Main Concerns: ${user.main_concerns}
Allergies: ${user.allergies}
`;

  const prompt = `
You are a skincare expert.
Analyze the product ingredients relative to the user's skin.

User Profile:
${userProfile}

Product Ingredients:
${ingredients}

Return JSON with no extra textwait write now the:
{
  "compatibility_score": number (0-100),
  "benefits": [],
  "warnings": [],
  "acne_trigger_risk": "Low/Medium/High",
  "recommendation_summary": "..."
}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: "You return JSON only." },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
};
