import TransactionCard from "../entity/transaction-card";

export default class TransactionCardFactory {
  public static create(
    idempotencyId: string,
    amount: number,
    type: string
  ): TransactionCard {
    return new TransactionCard(idempotencyId, amount, type);
  }
}
