import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

// Mock next/font/google
jest.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--font-geist-sans",
  }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
  }),
}));

// Mock OnboardingProvider
jest.mock("@/context/OnboardingContext", () => ({
  OnboardingProvider: ({ children }) => (
    <div data-testid="onboarding-provider">{children}</div>
  ),
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />;
  },
}));

describe("RootLayout", () => {
  it("renders children within OnboardingProvider", () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    );

    const provider = screen.getByTestId("onboarding-provider");
    expect(provider).toBeInTheDocument();

    const child = screen.getByTestId("test-child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Test Content");
  });

  it("renders logo image", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.svg");
    expect(logo).toHaveAttribute("width", "150");
    expect(logo).toHaveAttribute("height", "80");
  });

  it("renders with proper structure", () => {
    // Since RootLayout includes html and body tags which can't be tested in jsdom,
    // we verify that the component renders without errors
    const { container } = render(
      <RootLayout>
        <div data-testid="content">Content</div>
      </RootLayout>
    );

    // Verify the content is rendered
    expect(screen.getByTestId("content")).toBeInTheDocument();
    // Verify the logo is rendered
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("renders RootLayout component successfully", () => {
    // Test that RootLayout renders without throwing
    expect(() => {
      render(
        <RootLayout>
          <div>Test Content</div>
        </RootLayout>
      );
    }).not.toThrow();
  });

  it("positions logo correctly", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const logoContainer = screen.getByAltText("Logo").parentElement;
    expect(logoContainer).toHaveClass("absolute");
    expect(logoContainer).toHaveClass("left-6");
    expect(logoContainer).toHaveClass("top-6");
  });

  it("wraps multiple children correctly", () => {
    render(
      <RootLayout>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </RootLayout>
    );

    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });
});
