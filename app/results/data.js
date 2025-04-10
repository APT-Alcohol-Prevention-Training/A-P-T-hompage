export const results = {
  "0-3": {
    scenario: "Low Risk (0-3 Points)",
    questions: [
      {
        question: "What do you think counts as a 'standard drink'?",
        options: [
          {
            label:
              "A full glass of wine, a bottle of beer, or a shot of liquor",
            correct: true,
          },
          { label: "Any amount of alcohol in a cup", correct: false },
          {
            label: "A cocktail with multiple types of alcohol",
            correct: false,
          },
        ],
        answerExplanation:
          "A standard drink is: 12 oz beer (5% alcohol), 5 oz wine (12% alcohol), and 1.5 oz liquor (40% alcohol).",
      },
      {
        question: "If I don’t feel drunk, am I okay to drive?",
        options: [
          { label: "Yes, if I feel fine, I’m good to drive", correct: false },
          {
            label: "No, alcohol can affect me before I feel drunk",
            correct: true,
          },
        ],
        answerExplanation:
          "Alcohol impairs judgment and reaction time before you actually ‘feel’ drunk.",
      },
    ],
    sections: [
      {
        title: "What You’ll Learn Today",
        content: [
          "What is a Standard Drink?",
          "How Alcohol Affects the Body",
          "Alcohol Myths vs. Facts",
        ],
      },
      {
        title: "Standard Drink Details",
        content: {
          beer: "12 oz (1 can) of 5% alcohol",
          wine: "5 oz (1 glass) of 12% alcohol",
          liquor: "1.5 oz (1 shot) of 40% alcohol (e.g., whiskey, vodka)",
        },
      },
      {
        title: "Tip",
        content:
          "Just because a drink is smaller or lighter doesn’t mean it contains less alcohol! Cocktails and mixed drinks often have more than one standard drink in them.",
      },
      {
        title: "How Alcohol Affects Your Body",
        content: [
          "Brain – Slows down processing speed and decision-making.",
          "Liver – Can cause damage over time with excessive use.",
          "Sleep – Can interfere with deep sleep cycles.",
          "Did You Know? Even small amounts of alcohol can impair judgment and coordination, making activities like driving dangerous.",
        ],
      },
      {
        title: "Myths vs. Facts",
        content: [
          {
            myth: "Drinking coffee will sober you up.",
            fact: "Only time helps your body process alcohol. Coffee won’t make you sober—just more awake.",
          },
          {
            myth: "If I don’t feel drunk, I’m okay to drive.",
            fact: "Alcohol can impair judgment before you feel drunk.",
          },
        ],
      },
    ],
  },
  "4-7": {
    scenario: "Moderate Risk (4-7 Points)",
    questions: [
      {
        question:
          "How long does it take for your body to process ONE standard drink?",
        options: [
          { label: "15 minutes", correct: false },
          { label: "1 hour", correct: true },
          { label: "3 hours", correct: false },
        ],
        answerExplanation:
          "On average, your liver processes about one standard drink per hour. Drinking faster than this means your body can’t keep up, leading to intoxication.",
      },
      {
        question:
          "You’re at a party, and a friend offers you a drink. You don’t want to drink tonight—how do you respond?",
        options: [
          { label: "No thanks, I’m good with this one.", correct: true },
          {
            label: "I have an early morning, so I’m skipping tonight.",
            correct: true,
          },
          {
            label: "I’m taking a break from drinking right now.",
            correct: true,
          },
          { label: "Uhh… I don’t know, I guess I’ll take it.", correct: false },
        ],
        answerExplanation:
          "Keep it simple and confident works best. Most people respect a direct but friendly response.",
      },
    ],
    sections: [
      {
        title: "What You’ll Learn Today",
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
          "Drink slowly—sip, don’t chug!",
          "Avoid drinking games that encourage excessive drinking.",
        ],
      },
      {
        title: "Alternatives to Drinking",
        content: [
          "Try a mocktail instead of alcohol.",
          "Be the designated driver for the night.",
          "Get involved in games, dancing, or socializing.",
        ],
      },
      {
        title: "Tip",
        content:
          "Keep a non-alcoholic drink in your hand—it helps avoid repeated offers.",
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
          { label: "No, I don’t feel bad about it.", correct: false },
        ],
        answerExplanation:
          "Guilt can be a sign that drinking is affecting you in ways you don’t want it to.",
      },
      {
        question:
          "Which of these is a good alternative to drinking when stressed?",
        options: [
          { label: "Running or yoga", correct: true },
          { label: "Painting or playing video games", correct: true },
          { label: "Calling a friend", correct: true },
          { label: "All of the above", correct: true },
        ],
        answerExplanation:
          "There are many ways to manage stress without alcohol.",
      },
    ],
    sections: [
      {
        title: "What You’ll Learn Today",
        content: [
          "How to Recognize Problematic Drinking Patterns",
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
          "Exercise – Running, yoga, or gym workouts.",
          "Mindfulness – Meditation or deep breathing.",
          "Hobbies – Painting, gaming, or reading.",
          "Talking – Reaching out to a friend or therapist.",
        ],
      },
      {
        title: "Practical Tips for Cutting Back on Alcohol",
        content: [
          "Set a Drink Limit: Before you start drinking, decide how many drinks you’ll have—and stick to it.",
          "Alternate with Water: Have a glass of water or soda between alcoholic drinks.",
          "Avoid Drinking Games: They make it easy to lose track of how much you're drinking.",
          "Eat Before & During Drinking: Food slows down alcohol absorption, helping you stay more in control.",
          "Drink Slowly: Take sips, not gulps—your body needs time to process alcohol.",
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
          "Talking to someone or getting professional help is key. Ignoring the problem can make it worse.",
      },
      {
        question: "What’s a good strategy to help limit alcohol consumption?",
        options: [
          { label: "Set a drink limit before going out.", correct: true },
          { label: "Space out drinks with water or food.", correct: true },
          {
            label: "Find supportive friends or family to check in with.",
            correct: true,
          },
          { label: "All of the above", correct: true },
        ],
        answerExplanation:
          "Combining multiple strategies is the best way to cut back safely.",
      },
    ],
    sections: [
      {
        title: "What You’ll Learn Today",
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
          "Feeling the need to drink.",
          "Experiencing withdrawal symptoms (shakiness, anxiety).",
        ],
      },
      {
        title: "How to Cut Back Safely",
        content: [
          "Gradually reduce drinking instead of stopping suddenly.",
          "Set a plan (e.g., no more than 2 drinks per occasion).",
          "Find a support system (friends, family, therapist).",
        ],
      },
      {
        title: "Where to Get Help",
        content: [
          "Helplines & Support Groups",
          "Counseling & Treatment Programs",
          "Self-Help Guides",
        ],
      },
    ],
  },
};
