// Card.test.tsx

import { render, screen } from "@testing-library/react";
import { Card } from "../components/Card";

describe("Card", () => {
  test("renders user information", () => {
    const user = { id: 1, name: "John Doe", city: "New York" };

    render(<Card user={user} />);

    // Use regex to match parts of the text
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/cidade:/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
  });
});
