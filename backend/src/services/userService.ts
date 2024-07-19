import { initDb } from "../utils/db";

export const searchUsers = async (querys: any) => {
  const db = await initDb();
  const query = querys as string;
  const users = await db.all("SELECT * FROM users WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?", [
    `%${query}%`,
    `%${query}%`,
    `%${query}%`,
    `%${query}%`,
  ]);

  return { data: users };
};

export const searchUsersNoQuery = async (querys: any) => {
  const db = await initDb();
  const query = querys as string;
  const users = await db.all("SELECT * FROM users ");

  return { data: users };
};
