import { parse } from "csv-parse";
import { initDb } from "../utils/db";

import fs from "fs";
import { User } from "../types/user";

export async function saveCsvData(filePath: string): Promise<void> {
  const db = await initDb();
  const parser = fs.createReadStream(filePath).pipe(parse({ columns: true }));

  for await (const record of parser) {
    const user: User = {
      id: 0,
      name: record.name,
      city: record.city,
      country: record.country,
      favorite_sport: record.favorite_sport,
    };

    await db.run("INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)", [user.name, user.city, user.country, user.favorite_sport]);
  }
}
