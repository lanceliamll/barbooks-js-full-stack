import sqlite3 from "sqlite3";
import path from "path";

// database file in project root
const dbPath = path.resolve(__dirname, "../data.db");

// connect to sqlite
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// create schema if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    )
  `);
});
