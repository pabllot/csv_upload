import { initDb } from "../utils/db";

export const searchUsers = async (query: any) => {
  const db = await initDb();
  const field = query as string;
  const users = await db.all("SELECT * FROM users WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?", [
    `%${field}%`,
    `%${field}%`,
    `%${field}%`,
    `%${field}%`,
  ]);

  return { data: users };
};
