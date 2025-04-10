import { formFields } from "./onboardingFields";

export const appName = "AlcoholPreventionTraining";

export const formSteps = formFields.map((field) => field.fieldName);

export const scoringSystem = [
  {
    minScore: 0,
    maxScore: 3,
    riskLevel: "Low Risk (Safe Zone)",
    description: "Minimal alcohol use or no signs of harmful behavior.",
    trainingRecommendation:
      "Provide general alcohol education and responsible drinking tips.",
  },
  {
    minScore: 4,
    maxScore: 7,
    riskLevel: "Moderate Risk (Caution Zone)",
    description:
      "Early signs of risky drinking behaviors. User may benefit from intervention.",
    trainingRecommendation:
      "Provide strategies for controlled drinking, peer pressure management, and self-monitoring.",
  },
  {
    minScore: 8,
    maxScore: 12,
    riskLevel: "High Risk (Intervention Zone)",
    description:
      "Drinking habits indicate risk for health and social consequences.",
    trainingRecommendation:
      "Suggest harm reduction strategies, stress management alternatives, and behavioral change techniques.",
  },
  {
    minScore: 13,
    maxScore: null,
    riskLevel: "Severe Risk (Critical Zone)",
    description: "High likelihood of alcohol dependence or substance abuse.",
    trainingRecommendation:
      "Recommend professional support, counseling, or intervention programs.",
  },
];
