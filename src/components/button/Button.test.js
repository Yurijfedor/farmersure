import React from "react";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText("Test Button")).toBeInTheDocument();
  });

  it("renders correctly with variant prop", () => {
    const { getByRole } = render(
      <Button variant="formBtn" data-testid="test-button">
        Test Button
      </Button>
    );
    const button = screen.getByTestId("test-button");
    expect(button).toBeInTheDocument();
  });

  it("fires onClick callback when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Test Button</Button>
    );
    const button = getByText("Test Button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
