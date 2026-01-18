import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "db.json");

export async function readDB() {
  const raw = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(raw || "{}");
}

export async function writeDB(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}
