import { initDb } from "../utils/db";

// Define an interface for the User object
interface User {
  id: number;
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

export const searchUsers = async (query?: string): Promise<{ data: User[] }> => {
  const db = await initDb();

  try {
    let users: User[];
    if (!query) {
      users = await db.all<User[]>("SELECT * FROM users");
    } else {
      const field = query.toLowerCase();
      users = await db.all<User[]>("SELECT * FROM users WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?", [
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
