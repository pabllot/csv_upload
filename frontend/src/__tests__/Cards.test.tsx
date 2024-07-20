import { render, screen } from "@testing-library/react";
import { Cards } from "../components/Cards";
import { User } from "../types";

describe("Cards Component", () => {
  it("renders without crashing when data is empty", () => {
    render(<Cards data={[]} />);
    const container = screen.getByTestId("cards-container");
    expect(container).toBeInTheDocument();
    expect(container.querySelector("p")).toHaveTextContent("No users found.");
  });

  it("renders correctly with a list of users", () => {
    const mockData: User[] = [
      {
        id: 1,
        name: "John Doe",
        city: "New York",
        country: "USA",
        favorite_sport: "Basketball",
      },
      {
        id: 2,
        name: "Jane Smith",
        city: "Los Angeles",
        country: "USA",
        favorite_sport: "Soccer",
      },
    ];

    render(<Cards data={mockData} />);
    const container = screen.getByTestId("cards-container");
    expect(container).toBeInTheDocument();
    expect(container.querySelectorAll(".wrapper > div").length).toBe(mockData.length);

    mockData.forEach((user) => {
      screen.getAllByText(user.name).forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      screen.getAllByText(user.city).forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      screen.getAllByText(user.country).forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      screen.getAllByText(user.favorite_sport).forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });
});
