import request from "supertest";
import { initDb } from "../utils/db"; // Ensure this is correct
import app from "../Server";

describe("GET /api/users", () => {
  let db: any;

  beforeAll(async () => {
    db = await initDb(":memory:");
    // Insert test data into the database
    await db.run(`INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)`, ["John Doe", "New York", "USA", "Basketball"]);
    await db.run(`INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)`, ["Jane Smith", "London", "UK", "Football"]);
  });

  afterAll(async () => {
    // Clean up database
    await db.exec("DELETE FROM users");
    await db.close();
  });

  it("should return a 200 status and the correct response body for a valid query", async () => {
    const res = await request(app).get("/api/users").query({ q: "John" });
    expect(res.status).toBe(200);
    expect(res.body.data).toContainEqual(
      expect.objectContaining({
        name: "John Doe",
        city: "New York",
        country: "USA",
        favorite_sport: "Basketball",
      })
    );
  });

  it("should return a 200 status and all users if query is empty", async () => {
    const res = await request(app).get("/api/users").query({ q: "" });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "John Doe",
          city: "New York",
          country: "USA",
          favorite_sport: "Basketball",
        }),
        expect.objectContaining({
          name: "Jane Smith",
          city: "London",
          country: "UK",
          favorite_sport: "Football",
        }),
      ])
    );
  });

  it("should return a 200 status and an empty array if no matches found", async () => {
    const res = await request(app).get("/api/users").query({ q: "NonExistent" });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it("should return a 200 status and partial matches for a valid query", async () => {
    const res = await request(app).get("/api/users").query({ q: "Football" });
    expect(res.status).toBe(200);
    expect(res.body.data).toContainEqual(
      expect.objectContaining({
        name: "Jane Smith",
        city: "London",
        country: "UK",
        favorite_sport: "Football",
      })
    );
  });
});
