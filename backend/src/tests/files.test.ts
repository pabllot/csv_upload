import request from "supertest";
import fs from "fs";
import path from "path";
import app from "../Server";

describe("POST /api/files", () => {
  const csvFilePath = path.join(__dirname, "./test-files/test-file.csv");

  beforeAll(() => {
    // Ensure the directory exists
    if (!fs.existsSync(path.dirname(csvFilePath))) {
      fs.mkdirSync(path.dirname(csvFilePath), { recursive: true });
    }

    // Create a CSV file for testing
    fs.writeFileSync(csvFilePath, `name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\nJane Smith,London,UK,Football`);
  });

  afterAll(() => {
    // Clean up the temporary CSV file
    if (fs.existsSync(csvFilePath)) {
      fs.unlinkSync(csvFilePath);
    }
  });

  it("should return a 200 status and the correct response body for a valid CSV file upload", async () => {
    const res = await request(app).post("/api/files").attach("file", csvFilePath); // Use the 'attach' method to upload a file

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "The file was uploaded successfully." });
  });

  it("should return a 500 status and an error message when file upload fails", async () => {
    // Simulate a failure by sending a request without a file
    const res = await request(app).post("/api/files");

    expect(res.status).toBe(400); // Expecting 400 for missing file, or adjust based on your error handling
    expect(res.body).toEqual({ message: "No file uploaded" });
  });
});
