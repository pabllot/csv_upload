import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * Initializes and returns a SQLite database instance.
 *
 * @param filename - The database filename. Use ":memory:" for an in-memory database.
 * @returns The database instance.
 */
export async function initDb(filename: string = "./database.db") {
  const db = await open({
    filename,
    driver: sqlite3.Database,
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    city TEXT,
    country TEXT,
    favorite_sport TEXT
  )`);

  return db;
}
