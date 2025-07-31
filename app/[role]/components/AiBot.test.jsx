import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AiBotComponent from "./AiChatbot";

// Mock the chat service
jest.mock("./chatService", () => ({
  simulateAIResponse: jest.fn(),
  getInitialMessages: jest.fn(() => [
    {
      id: 1,
      type: "text",
      content:
        "👋 Hi there! I'm here to help you make smarter choices when it comes to alcohol. Ready to get started?",
      timestamp: "2:46 PM",
      isUser: false,
    },
  ]),
  generateTimestamp: jest.fn(() => "2:46 PM"),
}));

describe("AiBotComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders welcome message initially", () => {
    render(<AiBotComponent />);
    expect(
      screen.getByText(/Hi there! I'm here to help you make smarter choices/)
    ).toBeInTheDocument();
  });

  test("shows loading state when sending message", async () => {
    const { simulateAIResponse } = require("./chatService");
    simulateAIResponse.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<AiBotComponent />);

    const input = screen.getByPlaceholderText("Type your message here...");
    const sendButton = screen.getByText("Send Message");

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(sendButton);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText("Sky is typing...")).toBeInTheDocument();
    });
  });
});
