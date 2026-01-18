import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "db.json");

export const readDB = async () => {
  const raw = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(raw);
};

export const writeDB = async (db) => {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
};

export const getTodayIST = () => {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(
    new Date()
  );
};

export const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};
