export const formFields = [
  {
    title: "Section Code Verification",
    description:
      "Please enter the 6-character section code you received from the other website.",
    fieldName: "sectionCode",
    inputType: "text",
    placeholder: "Enter 6-character code",
    validation: {
      required: true,
      pattern: /^[A-Za-z0-9]{6}$/,
      message: "Please enter a valid 6-character code (letters and numbers only)"
    },
    nextField: "intro",
  },
  {
    title: "Welcome to the Alcohol Prevention Training",
    description:
      "This training will help you learn more about alcohol, its effects, and how to make safer choices. Let's start with a few questions.",
    fieldName: "intro",
    inputType: "content",
    nextField: "ageCheck",
  },
  {
    title: "Are you between the ages of 18 and 20?",
    fieldName: "ageCheck",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "alcoholExperience", points: 0 },
      { label: "No", value: "no", nextField: "ageWarning", points: 0 },
    ],
  },
  {
    title:
      "This assessment is designed for individuals between 18 and 20 years old. If you're younger or older, I can still provide general information on alcohol awareness. Would you like to continue?",
    fieldName: "ageWarning",
    inputType: "select",
    options: [
      {
        label: "Yes, I'd still like to learn more",
        value: "yes",
        nextField: "alcoholExperience",
        points: 0,
      },
      {
        label: "No, I'd rather not",
        value: "no",
        nextField: "results",
        points: 0,
      },
    ],
  },
  {
    title: "Have you ever had alcohol before, even just a few sips?",
    fieldName: "alcoholExperience",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "niaaaQuestions", points: 0 },
      { label: "No", value: "no", nextField: "crafftQuestions", points: 0 },
    ],
  },
  {
    title: "How often do you usually drink?",
    fieldName: "niaaaQuestions",
    inputType: "select",
    options: [
      {
        label: "Daily",
        value: "daily",
        nextField: "niaaaQuestions_2",
        points: 5,
      },
      {
        label: "Weekly",
        value: "weekly",
        nextField: "niaaaQuestions_2",
        points: 4,
      },
      {
        label: "Occasionally",
        value: "occasionally",
        nextField: "niaaaQuestions_2",
        points: 3,
      },
      {
        label: "Rarely",
        value: "rarely",
        nextField: "niaaaQuestions_2",
        points: 2,
      },
      {
        label: "Never",
        value: "never",
        nextField: "niaaaQuestions_2",
        points: 0,
      },
    ],
  },
  {
    title:
      "In the past year, how many times have you had 4 (women) or 5 (men) or more drinks in a single day?",
    fieldName: "niaaaQuestions_2",
    inputType: "select",
    options: [
      {
        label: "Never",
        value: "never",
        nextField: "niaaaQuestions_3",
        points: 0,
      },
      {
        label: "Less than once a month",
        value: "lessThanOnceAMonth",
        nextField: "niaaaQuestions_3",
        points: 1,
      },
      {
        label: "1–3 times a month",
        value: "1-3TimesAMonth",
        nextField: "niaaaQuestions_3",
        points: 2,
      },
      {
        label: "1–2 times a week",
        value: "1-2TimesAWeek",
        nextField: "niaaaQuestions_3",
        points: 3,
      },
      {
        label: "More than twice a week",
        value: "moreThanTwiceAWeek",
        nextField: "niaaaQuestions_3",
        points: 4,
      },
    ],
  },
  {
    title: "On average, how many days per week do you drink alcohol?",
    fieldName: "niaaaQuestions_3",
    inputType: "select",
    options: [
      {
        label: "0 days",
        value: "0Days",
        nextField: "niaaaQuestions_4",
        points: 0,
      },
      {
        label: "1–2 days",
        value: "1-2Days",
        nextField: "niaaaQuestions_4",
        points: 1,
      },
      {
        label: "3–4 days",
        value: "3-4Days",
        nextField: "niaaaQuestions_4",
        points: 2,
      },
      {
        label: "5+ days",
        value: "5PlusDays",
        nextField: "niaaaQuestions_4",
        points: 3,
      },
    ],
  },
  {
    title:
      "When you drink, how many drinks do you usually have in one sitting?",
    fieldName: "niaaaQuestions_4",
    inputType: "select",
    options: [
      {
        label: "1 drink",
        value: "1Drink",
        nextField: "crafftQuestions",
        points: 0,
      },
      {
        label: "2–3 drinks",
        value: "2-3Drinks",
        nextField: "crafftQuestions",
        points: 1,
      },
      {
        label: "4–5 drinks",
        value: "4-5Drinks",
        nextField: "crafftQuestions",
        points: 2,
      },
      {
        label: "6+ drinks",
        value: "6PlusDrinks",
        nextField: "crafftQuestions",
        points: 3,
      },
    ],
  },
  {
    title:
      "Have you ever ridden in a car driven by someone (including yourself) who was high or had been using alcohol or drugs?",
    fieldName: "crafftQuestions",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "crafftQuestions_2", points: 1 },
      { label: "No", value: "no", nextField: "crafftQuestions_2", points: 0 },
    ],
  },
  {
    title:
      "Do you ever use alcohol or drugs to relax, feel better about yourself, or fit in?",
    fieldName: "crafftQuestions_2",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "crafftQuestions_3", points: 1 },
      { label: "No", value: "no", nextField: "crafftQuestions_3", points: 0 },
    ],
  },
  {
    title: "Do you ever use alcohol or drugs when you are alone?",
    fieldName: "crafftQuestions_3",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "crafftQuestions_4", points: 1 },
      { label: "No", value: "no", nextField: "crafftQuestions_4", points: 0 },
    ],
  },
  {
    title: "Do you ever forget things you did while using alcohol or drugs?",
    fieldName: "crafftQuestions_4",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "crafftQuestions_5", points: 1 },
      { label: "No", value: "no", nextField: "crafftQuestions_5", points: 0 },
    ],
  },
  {
    title:
      "Have your family or friends ever told you that you should cut down on your drinking or drug use?",
    fieldName: "crafftQuestions_5",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "crafftQuestions_6", points: 1 },
      { label: "No", value: "no", nextField: "crafftQuestions_6", points: 0 },
    ],
  },
  {
    title:
      "Have you ever gotten into trouble while you were using alcohol or drugs?",
    fieldName: "crafftQuestions_6",
    inputType: "select",
    options: [
      { label: "Yes", value: "yes", nextField: "results", points: 1 },
      { label: "No", value: "no", nextField: "results", points: 0 },
    ],
  },
  {
    title: "Get Ready to Begin",
    description:
      "Now that you've completed the initial questions, your personalized alcohol prevention training is about to begin. Click below to get started.",
    fieldName: "results",
    inputType: "content",
    nextField: null,
    last: true,
  },
];
