import { initDb } from "../utils/db";

export const searchUsers = async (query?: any) => {
  const db = await initDb();

  try {
    let users;
    if (!query) {
      // If no query is provided, fetch all users
      users = await db.all("SELECT * FROM users");
    } else {
      // If a query is provided, search for users based on the query
      const field = query.toLowerCase();
      users = await db.all("SELECT * FROM users WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?", [
        `%${field}%`,
        `%${field}%`,
        `%${field}%`,
        `%${field}%`,
      ]);
    }

    return { data: users };
  } catch (error) {
    throw new Error(`An error occurred while searching for users`);
  }
};
