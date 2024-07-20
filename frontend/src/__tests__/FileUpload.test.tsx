import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";
import FileUpload from "../components/FileUpload";
import { api } from "../services/api";
import { notify } from "../components/Toast";

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));

jest.mock("../services/api", () => ({
  api: {
    post: jest.fn(),
  },
}));

jest.mock("../components/Toast", () => ({
  notify: jest.fn(),
}));

describe("FileUpload Component", () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("renders correctly", () => {
    render(<FileUpload query="test-query" />);
    expect(screen.getByText(/Select File/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload/i })).toBeDisabled();
  });

  it("enables the upload button when a file is selected", () => {
    render(<FileUpload query="test-query" />);
    const fileInput = screen.getByLabelText(/Select File/i) as HTMLInputElement;

    const file = new File(["test content"], "test.csv", { type: "text/csv" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files[0]).toEqual(file);
    expect(screen.getByRole("button", { name: /Upload/i })).toBeEnabled();
  });

  it("calls the API and invalidates the query on successful upload", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({});

    render(<FileUpload query="test-query" />);
    const fileInput = screen.getByLabelText(/Select File/i) as HTMLInputElement;
    const uploadButton = screen.getByRole("button", { name: /Upload/i });

    const file = new File(["test content"], "test.csv", { type: "text/csv" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/api/files", expect.any(FormData));
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["csv", "test-query"] });
      expect(notify).toHaveBeenCalledWith({ type: "success", message: "File Uploaded!" });
    });

    expect(screen.getByRole("button", { name: /Upload/i })).toBeDisabled();
  });

  it("displays an error notification on upload failure", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    (api.post as jest.Mock).mockRejectedValueOnce(new Error("Upload failed"));

    render(<FileUpload query="test-query" />);
    const fileInput = screen.getByLabelText(/Select File/i) as HTMLInputElement;
    const uploadButton = screen.getByRole("button", { name: /Upload/i });

    const file = new File(["test content"], "test.csv", { type: "text/csv" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/api/files", expect.any(FormData));
      expect(notify).toHaveBeenCalledWith({ type: "error", message: "Failed to upload the file!" });
    });

    expect(screen.getByRole("button", { name: /Upload/i })).toBeDisabled();

    consoleLogSpy.mockRestore();
  });
});
