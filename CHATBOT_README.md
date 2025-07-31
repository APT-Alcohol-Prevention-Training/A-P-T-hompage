# AI Chatbot System

This is a dynamic chatbot system that can handle different types of messages and simulate AI conversations. The system supports multiple message types, loading states, and user interactions.

## Features

### Message Types

1. **Text Messages** - Simple text responses from the AI
2. **Multiple Choice Questions** - Interactive quizzes with radio button options
3. **Success Messages** - Feedback messages with green checkmarks
4. **Options Messages** - Questions with two action buttons
5. **Loading Messages** - Animated typing indicators

### Key Features

- ✅ **Dynamic Message Rendering** - Different components for each message type
- ✅ **Loading States** - Animated typing indicators while AI responds
- ✅ **User Message Handling** - User messages appear on the right side
- ✅ **Auto-scroll** - Chat automatically scrolls to the latest message
- ✅ **Conversation Flow** - Simulated AI responses based on user input
- ✅ **Interactive Elements** - Buttons and options that trigger responses

## File Structure

```
app/[role]/components/
├── AiBot.jsx                    # Main chatbot component
├── ChatInput.jsx                # User input component
├── ChatMessage.jsx              # Message router component
├── chatService.js               # AI response simulation
└── message-types/
    ├── TextMessage.jsx          # Simple text messages
    ├── MultipleChoiceMessage.jsx # Quiz questions
    ├── SuccessMessage.jsx       # Feedback messages
    ├── OptionsMessage.jsx       # Action buttons
    └── LoadingMessage.jsx       # Typing indicators
```

## How It Works

### 1. Message Flow

```javascript
User types message → Add to chat → Show loading → Simulate AI response → Add AI message
```

### 2. Message Types

Each message has a `type` property that determines which component renders it:

- `text` - Simple text message
- `multiple-choice` - Quiz with radio buttons
- `success` - Feedback with green checkmark
- `options` - Two action buttons
- `loading` - Animated typing indicator

### 3. State Management

The main component manages:

- `messages` - Array of all chat messages
- `isLoading` - Boolean for loading state
- `showChatList` - Boolean for chat vs welcome screen

## Usage

### Basic Usage

```jsx
import AiBotComponent from "./components/AiBot";

function App() {
  return <AiBotComponent />;
}
```

### Customizing AI Responses

Edit `chatService.js` to modify the AI response logic:

```javascript
export const simulateAIResponse = async (userMessage, conversationHistory) => {
  // Add your custom logic here
  const responses = [
    {
      type: "options",
      content: "Your custom message here",
      options: ["Option 1", "Option 2"],
      timestamp: generateTimestamp(),
    },
  ];

  return responses[conversationHistory.length % responses.length];
};
```

### Adding New Message Types

1. Create a new component in `message-types/`
2. Add the case to `ChatMessage.jsx`
3. Update the message type in your responses

## Message Structure

```javascript
{
  id: Date.now(),
  type: 'text|multiple-choice|success|options|loading',
  content: "Message content",
  timestamp: "2:46 PM",
  isUser: false,
  options: ["Option 1", "Option 2"], // For multiple-choice and options
  correctAnswer: "Correct answer" // For multiple-choice
}
```

## Styling

The system uses Tailwind CSS with custom classes:

- `.box-shadow` - Standard shadow for message bubbles
- `.animate-bounce` - Loading animation
- Custom gradients for buttons

## Testing

Run the test suite:

```bash
npm test
```

The test file `AiBot.test.jsx` includes:

- Initial render test
- Loading state test
- Message interaction test

## Customization

### Changing the AI Name

Update the name "Sky" in each message component.

### Modifying Response Logic

Edit the `simulateAIResponse` function in `chatService.js`.

### Adding New Message Types

1. Create component in `message-types/`
2. Add case to `ChatMessage.jsx`
3. Update response logic

### Styling Changes

Modify the Tailwind classes in each component or add custom CSS.

## Example Conversation Flow

1. **Welcome Message** - Text message from AI
2. **User Input** - User types a message
3. **Loading State** - Animated typing indicator
4. **AI Response** - Options message with buttons
5. **User Selection** - User clicks a button
6. **Loading State** - Another typing indicator
7. **AI Response** - Multiple choice question
8. **User Answer** - User selects an option
9. **Success Message** - Feedback with checkmark
10. **Continue Flow** - More interactive messages

This creates a dynamic, engaging conversation that educates users about alcohol safety while maintaining their interest through interactive elements.
