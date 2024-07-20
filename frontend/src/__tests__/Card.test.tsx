import { render, screen } from "@testing-library/react";
import { Card } from "../components/Card";
import { User } from "../types";

describe("Card Component", () => {
  it("renders user information", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
      city: "New York",
      country: "United States",
      favorite_sport: "soccer",
    };

    render(<Card user={user} />);

    expect(screen.getByTestId("info-card")).toBeInTheDocument();
    expect(screen.getByTestId("user-name")).toHaveTextContent(/John Doe/i);
    expect(screen.getByTestId("user-city")).toHaveTextContent(/New York/i);
    expect(screen.getByTestId("user-country")).toHaveTextContent(/United States/i);
    expect(screen.getByTestId("user-sport")).toHaveTextContent(/soccer/i);
  });
});
