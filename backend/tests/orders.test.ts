import request from "supertest";
import app from "../src/app";
import { db } from "../src/db";

describe("POST /api/orders", () => {
  beforeAll((done) => {
    // Reset in-memory table before tests
    db.serialize(() => {
      db.run("DROP TABLE IF EXISTS orders");
      db.run(`
        CREATE TABLE orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product TEXT NOT NULL,
          qty INTEGER NOT NULL,
          price REAL NOT NULL
        )
      `, done);
    });
  });

  it("should insert and return a new order", async () => {
    const newOrder = { product: "Google Pixel 2", qty: 2, price: 500 };

    const res = await request(app)
      .post("/api/orders")
      .send(newOrder)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.product).toBe("Google Pixel 2");
    expect(res.body.qty).toBe(2);
    expect(res.body.price).toBe(500);
  });


	// Edge cases or empty fields
  it("should return 400 for invalid input", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({ product: "", qty: -1, price: 0 })
      .expect(400);

    expect(res.body).toHaveProperty("error");
  });
});
