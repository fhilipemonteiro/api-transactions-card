import TransactionCardFactory from "./transaction-card.factory";

describe("Transaction factory unit tests", () => {
  test("should create a transaction", () => {
    const transaction = new TransactionCardFactory().create(100, "credit");
    expect(transaction.idempotencyId).toBe(transaction.idempotencyId);
    expect(transaction.amount).toBe(100);
    expect(transaction.type).toBe("credit");
  });
});
