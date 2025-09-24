import { db } from "./db";

const orders = [
  { product: "iPhone 15 Pro Max", qty: 2, price: 3 },   // 6
  { product: "MacBook Air", qty: 5, price: 2 },         // 10
  { product: "iPhone 15 Pro Max", qty: 3, price: 3 },   // 9
  { product: "iPad Pro", qty: 1, price: 8 },            // 8
  { product: "AirPods Pro", qty: 4, price: 2.5 },       // 10
];

// clear + insert mock data
db.serialize(() => {
  db.run("DELETE FROM orders");
  const stmt = db.prepare("INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)");

  for (const o of orders) {
    stmt.run(o.product, o.qty, o.price);
  }

  stmt.finalize();
  console.log("Seed data inserted.");
});

db.close();
