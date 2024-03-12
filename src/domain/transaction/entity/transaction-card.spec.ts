import TransactionCard from "./transaction-card";

describe("TransactionCard unit tests", () => {
  it("should throw error when idempotencyId is empty", () => {
    expect(() => new TransactionCard("", 100, "credit")).toThrow(
      "idempotencyId is empty"
    );
  });

  it("should throw error when amount is negative", () => {
    expect(() => new TransactionCard("123", -100, "credit")).toThrow(
      "amount is negative"
    );
  });

  it("should throw error when type is empty", () => {
    expect(() => new TransactionCard("123", 100, "")).toThrow("type is empty");
  });
});
