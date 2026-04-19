import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetPath = path.join(__dirname, "..", "data", "hairstyles.json");

const hairstyleDataset = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));

const SCORE_WEIGHTS = {
  event: 55,
  hairLength: 35,
  imageProvided: 10,
};

export function getTopRecommendations({ eventType, hairLength, image }) {
  const scored = hairstyleDataset
    .map((hairstyle) => {
      const eventScore = (hairstyle.events[eventType] ?? 0) * SCORE_WEIGHTS.event;
      const hairLengthScore =
        (hairstyle.hairLengths[hairLength] ?? 0) * SCORE_WEIGHTS.hairLength;
      const imageScore = image ? SCORE_WEIGHTS.imageProvided : 0;
      const totalScore = Math.round(eventScore + hairLengthScore + imageScore);

      return {
        ...hairstyle,
        matchScore: Math.min(totalScore, 99),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const [recommendedHairstyle, ...alternatives] = scored;

  return {
    recommendedHairstyle,
    alternatives: alternatives.slice(0, 3),
  };
}

export function getRecommendationExplanation({ eventType, hairLength }, hairstyle) {
  const eventStrength = hairstyle.events[eventType] ?? 0;
  const hairStrength = hairstyle.hairLengths[hairLength] ?? 0;

  if (eventStrength >= 0.9 && hairStrength >= 0.9) {
    return `This style is an excellent match for ${eventType} with ${hairLength.toLowerCase()} hair.`;
  }

  if (eventStrength >= 0.9) {
    return `This style strongly fits a ${eventType} bridal look and still works well for ${hairLength.toLowerCase()} hair.`;
  }

  if (hairStrength >= 0.9) {
    return `This style is especially strong for ${hairLength.toLowerCase()} hair and still suits a ${eventType} event well.`;
  }

  return `This style balances your ${eventType} event styling needs with the flexibility of ${hairLength.toLowerCase()} hair.`;
}
