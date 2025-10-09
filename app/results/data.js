export const results = {
  "0-3": {
    scenario: "Low Risk (0-3 Points)",
    questions: [
      {
        question: "What do you think counts as a 'standard drink'?",
        options: [
          {
            label: "A full glass of wine, a bottle of beer, or a shot of liquor",
            correct: true,
          },
          { label: "Any amount of alcohol in a cup", correct: false },
          {
            label: "A cocktail with multiple types of alcohol",
            correct: false,
          },
        ],
        answerExplanation:
          "A standard drink is 12 oz beer (5% alcohol), 5 oz wine (12% alcohol), or 1.5 oz liquor (40% alcohol).",
      },
      {
        question: "What do you think is the most common effect of alcohol on the brain?",
        options: [
          { label: "Slower reaction time", correct: true },
          { label: "Increased focus", correct: false },
          { label: "Stronger memory", correct: false },
        ],
        answerExplanation:
          "Alcohol slows your reaction time, even when you feel fine.",
      },
      {
        question: "If you don't feel drunk, are you okay to drive?",
        options: [
          { label: "Yes, if I feel fine, I'm good to drive.", correct: false },
          {
            label: "No, alcohol can affect me before I feel drunk.",
            correct: true,
          },
        ],
        answerExplanation:
          "Alcohol affects judgment and reaction time before you feel the impact.",
      },
    ],
    sections: [
      {
        title: "What You'll Learn Today",
        content: [
          "What is a Standard Drink?",
          "How Alcohol Affects the Body",
          "Alcohol Myths vs. Facts",
        ],
      },
      {
        title: "Standard Drink Details",
        content: {
          Beer: "12 oz (1 can) at about 5% alcohol",
          Wine: "5 oz (1 glass) at about 12% alcohol",
          Liquor: "1.5 oz (1 shot) at about 40% alcohol (vodka, whiskey, etc.)",
        },
      },
      {
        title: "How Alcohol Affects Your Body",
        content: [
          "Brain — slows processing speed and decision making.",
          "Liver — can be damaged over time with excessive use.",
          "Sleep — interferes with deep sleep cycles.",
          "Safety — even small amounts can make driving dangerous.",
        ],
      },
      {
        title: "Myths vs. Facts",
        content: [
          "Myth: Drinking coffee will sober you up. Fact: Only time helps your body process alcohol.",
          "Myth: If I don't feel drunk, I'm okay to drive. Fact: Alcohol can impair judgment before you feel it.",
        ],
      },
      {
        title: "Tip",
        content:
          "Cocktails and mixed drinks often contain more than one standard drink, even if they seem light.",
      },
    ],
  },
  "4-7": {
    scenario: "Moderate Risk (4-7 Points)",
    questions: [
      {
        question: "How long does it take for your body to process ONE standard drink?",
        options: [
          { label: "15 minutes", correct: false },
          { label: "1 hour", correct: true },
          { label: "3 hours", correct: false },
        ],
        answerExplanation:
          "On average, your liver processes one standard drink every hour.",
      },
      {
        question:
          "You're at a party, and a friend offers you a drink. You don't want to drink tonight—how do you respond?",
        options: [
          { label: "No thanks, I'm good with this one.", correct: true },
          {
            label: "I have an early morning, so I'm skipping tonight.",
            correct: true,
          },
          {
            label: "I'm taking a break from drinking right now.",
            correct: true,
          },
          { label: "Uhh... I don't know, I guess I'll take it.", correct: false },
        ],
        answerExplanation:
          "Direct, friendly responses help you stick to your limits and most friends will respect them.",
      },
      {
        question:
          "Let's say you're at a party, and you don't feel like drinking. What's a fun alternative?",
        options: [
          { label: "Try a mocktail instead of alcohol", correct: true },
          { label: "Be the designated driver for the night", correct: true },
          { label: "Get involved in games, dancing, or socializing", correct: true },
          {
            label: "Stand awkwardly in the corner and pretend to text",
            correct: false,
          },
        ],
        answerExplanation:
          "Mocktails, driving friends, or engaging in activities all let you enjoy the moment without alcohol.",
      },
    ],
    sections: [
      {
        title: "What You'll Learn Today",
        content: [
          "Setting Drinking Limits",
          "How to Say No to Alcohol",
          "Alternatives to Drinking at Social Events",
        ],
      },
      {
        title: "Setting Drinking Limits",
        content: [
          "Set a drink limit before going out.",
          "Alternate between alcoholic and non-alcoholic drinks.",
          "Drink slowly—sip, don't chug.",
          "Avoid drinking games that push rapid drinking.",
        ],
      },
      {
        title: "How to Say No",
        content: [
          "No thanks, I'm good with this one.",
          "I have an early morning, so I'm skipping tonight.",
          "I'm taking a break from drinking right now.",
        ],
      },
      {
        title: "Alternatives to Drinking",
        content: [
          "Try a mocktail or sparkling water with fruit.",
          "Be the designated driver.",
          "Lean into games, dancing, or conversations.",
        ],
      },
      {
        title: "Tip",
        content:
          "Keep a non-alcoholic drink in hand—it helps prevent repeated offers.",
      },
    ],
  },
  "8-12": {
    scenario: "High Risk (8-12 Points)",
    questions: [
      {
        question: "Have you ever felt guilty about drinking?",
        options: [
          { label: "Yes, sometimes I regret drinking.", correct: true },
          { label: "No, I don't feel bad about it.", correct: true },
        ],
        answerExplanation:
          "Take note of how drinking makes you feel—guilt can be a signal to make changes.",
      },
      {
        question: "Which of these is a good alternative to drinking when stressed?",
        options: [
          { label: "Running or yoga", correct: true },
          { label: "Painting or playing video games", correct: true },
          { label: "Calling a friend", correct: true },
          { label: "All of the above", correct: true },
        ],
        answerExplanation:
          "Healthy coping strategies make it easier to manage stress without alcohol.",
      },
      {
        question: "Which of these tips do you think would work best for you?",
        options: [
          { label: "Setting a drink limit", correct: true },
          { label: "Alternating drinks with water", correct: true },
          { label: "Avoiding drinking games", correct: true },
          { label: "Drinking more slowly", correct: true },
        ],
        answerExplanation:
          "Even one small change can make a difference—stack strategies for more progress.",
      },
    ],
    sections: [
      {
        title: "What You'll Learn Today",
        content: [
          "Recognizing Problematic Drinking Patterns",
          "Stress Management Techniques (Without Alcohol)",
          "How to Reduce Drinking Safely",
        ],
      },
      {
        title: "Recognizing Problematic Drinking",
        content: [
          "Drinking more than you planned.",
          "Feeling guilty about drinking.",
          "Drinking to cope with stress or emotions.",
          "Blacking out or forgetting events while drinking.",
        ],
      },
      {
        title: "Stress Management Without Alcohol",
        content: [
          "Exercise like running, yoga, or gym workouts.",
          "Mindfulness practices such as meditation.",
          "Creative or relaxing hobbies like painting or gaming.",
          "Talking with a friend or therapist.",
        ],
      },
      {
        title: "Practical Tips for Cutting Back on Alcohol",
        content: [
          "Set a drink limit and stick to it.",
          "Alternate drinks with water or soda.",
          "Avoid drinking games so you can track intake.",
          "Eat before and during drinking to slow absorption.",
          "Drink slowly so your body has time to process alcohol.",
        ],
      },
    ],
  },
  "13+": {
    scenario: "Severe Risk (13+ Points)",
    questions: [
      {
        question:
          "If drinking started causing problems in your work, school, or relationships, what would you do?",
        options: [
          { label: "Try to cut back on my own.", correct: true },
          { label: "Talk to someone I trust.", correct: true },
          { label: "Ignore it and hope it improves.", correct: false },
        ],
        answerExplanation:
          "Taking action—on your own or with support—is safer than hoping the problem goes away.",
      },
      {
        question: "What's a good strategy to help limit alcohol consumption?",
        options: [
          { label: "Set a drink limit before going out.", correct: false },
          { label: "Space out drinks with water or food.", correct: false },
          {
            label: "Find supportive friends or family to check in with.",
            correct: false,
          },
          { label: "All of the above.", correct: true },
        ],
        answerExplanation:
          "Combining several strategies—limits, spacing drinks, and support—helps you cut back safely.",
      },
      {
        question:
          "If you needed help with drinking, where would you feel most comfortable starting?",
        options: [
          {
            label: "Talking to a trusted friend or family member.",
            correct: true,
          },
          { label: "Looking up online resources or self-help guides.", correct: true },
          { label: "Reaching out to a counselor or support group.", correct: true },
          { label: "I'm not sure—I haven't thought about it.", correct: true },
        ],
        answerExplanation:
          "Any starting point counts—whether it's trusted people, online research, professionals, or simply deciding to learn more.",
      },
    ],
    sections: [
      {
        title: "What You'll Learn Today",
        content: [
          "Understanding Alcohol Dependence",
          "How to Cut Back Safely",
          "Where to Get Professional Help",
        ],
      },
      {
        title: "Understanding Alcohol Dependence",
        content: [
          "Drinking even when it causes problems.",
          "Feeling a strong need or craving to drink.",
          "Experiencing withdrawal symptoms such as shakiness or anxiety.",
        ],
      },
      {
        title: "How to Cut Back Safely",
        content: [
          "Gradually reduce alcohol instead of stopping suddenly.",
          "Set a plan, like no more than two drinks per occasion.",
          "Find a support system—friends, family, or a therapist.",
        ],
      },
      {
        title: "Where to Get Help",
        content: [
          "Helplines and local support groups.",
          "Counseling or treatment programs.",
          "Self-help guides and digital tools.",
        ],
      },
    ],
  },
};
