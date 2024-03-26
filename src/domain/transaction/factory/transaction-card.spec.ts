import TransactionCardFactory from "./transaction-card.factory";

describe("Transaction factory unit tests", () => {
  test("should create a transaction", () => {
    const transaction = TransactionCardFactory.create("123", 100, "credit");
    expect(transaction.idempotencyId).toBe("123");
    expect(transaction.amount).toBe(100);
    expect(transaction.type).toBe("credit");
  });
});
