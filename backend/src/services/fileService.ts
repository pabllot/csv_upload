import { parse } from "csv-parse";
import { initDb } from "../utils/db";
import { User } from "../types/user";
import { Readable } from "stream";

export async function saveCsvData(fileBuffer: Buffer): Promise<void> {
  const db = await initDb();
  const parser = Readable.from(fileBuffer).pipe(parse({ columns: true }));

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
