import TransactionCard from "../entity/transaction-card";
import { v4 as uuid } from "uuid";

export default class TransactionCardFactory {
  public create(amount: number, type: string): TransactionCard {
    return new TransactionCard(uuid(), amount, type);
  }
}
