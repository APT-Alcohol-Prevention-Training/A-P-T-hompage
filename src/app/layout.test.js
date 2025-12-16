import React from "react";
import RootLayout from "./layout";

// Mock OnboardingProvider
jest.mock("@/context/OnboardingContext", () => ({
  OnboardingProvider: ({ children }) => (
    <div data-testid="onboarding-provider">{children}</div>
  ),
}));

import { OnboardingProvider } from "@/context/OnboardingContext";

describe("RootLayout", () => {
  it("wraps children with OnboardingProvider and html/body structure", () => {
    const child = <div data-testid="test-child">Test Content</div>;
    const tree = RootLayout({ children: child });

    expect(tree.type).toBe("html");
    expect(tree.props.lang).toBe("en");

    const body = tree.props.children;
    expect(body.type).toBe("body");
    expect(body.props.className).toContain("antialiased");

    const provider = body.props.children;
    expect(provider.type).toBe(OnboardingProvider);
    expect(provider.props.children).toBe(child);
  });

  it("passes multiple children through to provider", () => {
    const children = [
      <div key="1">Child 1</div>,
      <div key="2">Child 2</div>,
    ];
    const tree = RootLayout({ children });
    const provider = tree.props.children.props.children;
    expect(provider.type).toBe(OnboardingProvider);
    expect(provider.props.children).toBe(children);
  });
});
