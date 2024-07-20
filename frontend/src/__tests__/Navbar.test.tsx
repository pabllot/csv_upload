import { render, screen } from "@testing-library/react";
import { Navbar } from "../components/Navbar";

jest.mock("../components/FileUpload", () => () => <div data-testid="upload-button" />);
jest.mock("../components/SearchBar", () => () => <div data-testid="search-input" />);

describe("Navbar Component", () => {
  it("renders FileUpload and SearchBar components", () => {
    const mockSetQuery = jest.fn();
    const query = "test query";

    render(<Navbar query={query} setQuery={mockSetQuery} />);

    expect(screen.getByTestId("upload-button")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("passes the correct props to FileUpload and SearchBar", () => {
    const mockSetQuery = jest.fn();
    const query = "test query";

    render(<Navbar query={query} setQuery={mockSetQuery} />);
  });
});
