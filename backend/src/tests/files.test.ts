import request from "supertest";
import fs from "fs";
import path from "path";
import app from "../Server";
import * as fileService from "../services/fileService";
import { jest } from "@jest/globals";

jest.mock("../services/fileService");

const mockedSaveCsvData = fileService.saveCsvData as jest.MockedFunction<typeof fileService.saveCsvData>;

describe("POST /api/files", () => {
  const testFilesDir = path.join(__dirname, "test-files");
  const csvFilePath = path.join(testFilesDir, "test-file.csv");

  beforeAll(() => {
    // Make sure the test-files directory exists
    if (!fs.existsSync(testFilesDir)) {
      fs.mkdirSync(testFilesDir);
    }

    // Create a CSV file for testing
    fs.writeFileSync(csvFilePath, `name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\nJane Smith,London,UK,Football`);
  });

  afterAll(() => {
    // Clean up the temporary CSV file and directory
    if (fs.existsSync(csvFilePath)) {
      fs.unlinkSync(csvFilePath);
    }

    if (fs.existsSync(testFilesDir) && fs.readdirSync(testFilesDir).length === 0) {
      fs.rmdirSync(testFilesDir);
    }
  });

  it("should return a 200 status and the correct response body for a valid CSV file upload", async () => {
    mockedSaveCsvData.mockResolvedValueOnce(); // Mock successful save
    const res = await request(app).post("/api/files").attach("file", csvFilePath);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "The file was uploaded successfully." });
  });

  it("should return a 400 status and an error message when file upload fails", async () => {
    // failure by sending a request without a file
    const res = await request(app).post("/api/files");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "No file uploaded" });
  });

  it("should return a 500 status and an error message when saveCsvData throws an error", async () => {
    mockedSaveCsvData.mockRejectedValueOnce(new Error("Database error")); // Mock failure
    const res = await request(app).post("/api/files").attach("file", csvFilePath);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error uploading the file. Please try again later." });
  });
});
