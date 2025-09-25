import { summarizeOrders, Order } from "../src/orders/summarizeOrders";

describe("summarizeOrders", () => {
  test("typical case", () => {
    const orders: Order[] = [
      { id: 1, product: "iPhone 15 Pro Max", qty: 2, price: 3 },   // 6
      { id: 2, product: "MacBook Air", qty: 5, price: 2 },  // 10
      { id: 3, product: "iPhone 15 Pro Max", qty: 3, price: 3 },   // 9
    ];

    expect(summarizeOrders(orders)).toEqual({
      totalRevenue: 25,
      medianOrderPrice: 10,
      topProductByQty: "iPhone 15 Pro Max",
      uniqueProductCount: 2,
    });
  });

  test("even number of orders", () => {
    const orders: Order[] = [
      { id: 1, product: "iPhone 16 Pro Max", qty: 1, price: 10 }, // 10
      { id: 2, product: "iMac", qty: 1, price: 20 }, // 20
      { id: 3, product: "iPhone 17", qty: 1, price: 30 }, // 30
      { id: 4, product: "iPad", qty: 1, price: 40 }, // 40`
    ];
    const result = summarizeOrders(orders);
    expect(result.medianOrderPrice).toBe(25);
    expect(result.totalRevenue).toBe(100);
    expect(result.uniqueProductCount).toBe(4);
  });

  test("empty input", () => {
    expect(summarizeOrders([])).toEqual({
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: "",
      uniqueProductCount: 0,
    });
  });
});
