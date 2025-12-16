export const scenarioQuestions = {
  scenario1: [
    {
      questionText: "What do you think counts as a 'standard drink'?",
      options: [
        "A full glass of wine, a bottle of beer, or a shot of liquor",
        "Any amount of alcohol in a cup",
        "A cocktail with multiple types of alcohol",
      ],
      correctAnswerIndex: 0,
      explanationCorrect:
        "Yes! A standard drink is 12 oz beer (5% alcohol), 5 oz wine (12% alcohol), or 1.5 oz liquor (40% alcohol).",
      explanationIncorrect:
        "Not quite! The amount of liquid is less important than the alcohol content. A cocktail can include multiple standard drinks.",
    },
    {
      questionText: "What do you think is the most common effect of alcohol on the brain?",
      options: [
        "Slower reaction time",
        "Increased focus",
        "Stronger memory",
      ],
      correctAnswerIndex: 0,
      explanationCorrect:
        "Correct! Alcohol slows the brain down, which is why even small amounts can make driving unsafe.",
      explanationIncorrect:
        "Actually, alcohol slows brain function, which is why people often feel foggy after drinking.",
    },
    {
      questionText: "If you don't feel drunk, are you okay to drive?",
      options: [
        "Yes, if I feel fine, I'm good to drive.",
        "No, alcohol can affect me before I feel drunk.",
      ],
      correctAnswerIndex: 1,
      explanationCorrect:
        "Exactly! Alcohol harms judgment and reaction time before you feel the effects.",
      explanationIncorrect:
        "Be careful! Even small amounts of alcohol slow your reaction time and thinking.",
    },
  ],
  scenario2: [
    {
      questionText: "How long does it take for your body to process ONE standard drink?",
      options: ["15 minutes", "1 hour", "3 hours"],
      correctAnswerIndex: 1,
      explanationCorrect:
        "Yes! On average, your liver processes about one standard drink per hour.",
      explanationIncorrect:
        "Actually, it takes about one hour per drink. Drinking faster than that lets alcohol build up in your system.",
    },
    {
      questionText:
        "You're at a party, and a friend offers you a drink. You don't want to drink tonight—how do you respond?",
      options: [
        "No thanks, I'm good with this one.",
        "I have an early morning, so I'm skipping tonight.",
        "I'm taking a break from drinking right now.",
        "Uhh... I don't know, I guess I'll take it.",
      ],
      correctAnswerIndexes: [0, 1, 2],
      explanationCorrect:
        "Great choice! Keeping it simple and confident works best. Most people respect a direct but friendly response.",
      explanationIncorrect:
        "It can be hard to say no, but remember—you always have the choice. Want to see some strategies for handling these situations?",
    },
    {
      questionText:
        "Let's say you're at a party, and you don't feel like drinking. What's a fun alternative?",
      options: [
        "Try a mocktail instead of alcohol",
        "Be the designated driver for the night",
        "Get involved in games, dancing, or socializing",
        "Stand awkwardly in the corner and pretend to text",
      ],
      correctAnswerIndexes: [0, 1, 2],
      explanationCorrect:
        "Exactly! There are plenty of ways to enjoy yourself without drinking.",
      explanationIncorrect:
        "That doesn't sound like much fun! There are better ways to enjoy the party. Want to see some easy conversation starters?",
    },
  ],
  scenario3: [
    {
      questionText: "Have you ever felt guilty about drinking?",
      options: [
        "Yes, sometimes I regret drinking.",
        "No, I don't feel bad about it.",
      ],
      correctAnswerIndexes: [0, 1],
      explanationCorrect:
        "Anytime drinking leaves you feeling conflicted, it's worth pausing to reflect on why.",
      explanationIncorrect:
        "Anytime drinking leaves you feeling conflicted, it's worth pausing to reflect on why.",
      optionFeedback: [
        "That feeling of guilt can be a sign that drinking is affecting you in ways you don't want it to. Want some tips on cutting back?",
        "That's good! If drinking ever starts to feel negative emotionally, it's okay to take a step back and reflect.",
      ],
      showCorrectness: false,
    },
    {
      questionText: "Which of these is a good alternative to drinking when stressed?",
      options: [
        "Running or yoga",
        "Painting or playing video games",
        "Calling a friend",
        "All of the above",
      ],
      correctAnswerIndexes: [0, 1, 2, 3],
      explanationCorrect:
        "That's right! There are many ways to manage stress without alcohol—experiment to find what helps you most.",
      explanationIncorrect:
        "Each of these activities can reduce stress without alcohol. Explore the ones that fit your life best.",
    },
    {
      questionText: "Which of these tips do you think would work best for you?",
      options: [
        "Setting a drink limit",
        "Alternating drinks with water",
        "Avoiding drinking games",
        "Drinking more slowly",
      ],
      correctAnswerIndexes: [0, 1, 2, 3],
      explanationCorrect:
        "Great choice! Even one small change can help you drink less without feeling like you're missing out.",
      explanationIncorrect:
        "Great choice! Even one small change can help you drink less without feeling like you're missing out.",
    },
  ],
  scenario4: [
    {
      questionText:
        "If drinking started causing problems in your work, school, or relationships, what would you do?",
      options: [
        "Try to cut back on my own.",
        "Talk to someone I trust.",
        "Ignore it and hope it improves.",
      ],
      correctAnswerIndexes: [0, 1],
      explanationCorrect:
        "Taking action—whether on your own or with support—is a strong step toward change.",
      explanationIncorrect:
        "Ignoring the problem can make it worse over time. Small changes or support can make a big difference.",
    },
    {
      questionText: "What's a good strategy to help limit alcohol consumption?",
      options: [
        "Set a drink limit before going out.",
        "Space out drinks with water or food.",
        "Find supportive friends or family to check in with.",
        "All of the above.",
      ],
      correctAnswerIndex: 3,
      explanationCorrect:
        "That's right! Combining strategies—limits, water, and support—helps you cut back safely.",
      explanationIncorrect:
        "Actually, combining several strategies works best. Limits, water breaks, and support make cutting back safer.",
    },
    {
      questionText:
        "If you needed help with drinking, where would you feel most comfortable starting?",
      options: [
        "Talking to a trusted friend or family member.",
        "Looking up online resources or self-help guides.",
        "Reaching out to a counselor or support group.",
        "I'm not sure—I haven't thought about it.",
      ],
      correctAnswerIndexes: [0, 1, 2, 3],
      explanationCorrect:
        "That is a great step! Whether it is a trusted person, online resources, or professional help, taking action matters.",
      explanationIncorrect:
        "That is a great step! Whether it is a trusted person, online resources, or professional help, taking action matters.",
      optionFeedback: [
        "That's a great step! Support from friends or family can make change easier.",
        "That's a great step! Reliable information can guide your next moves.",
        "That's a great step! Professionals and support groups can tailor help to you.",
        "That's okay! When you're ready, we can explore resources together.",
      ],
      showCorrectness: false,
    },
  ],
};
