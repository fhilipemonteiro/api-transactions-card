import TransactionOutputDTO from "../../application/services/transaction/transaction.dto";
import TransactionCardFactory from "../../domain/transaction/factory/transaction-card.factory";
import { DynamoDB } from "../config/aws/aws.config";

export default class TransactionRepository {
  private readonly transactionCardFactory: TransactionCardFactory;

  constructor() {
    this.transactionCardFactory = new TransactionCardFactory();
  }

  db = DynamoDB();

  async findAll(): Promise<TransactionOutputDTO[]> {
    try {
      const params = {
        TableName: process.env.DDB_TABLE_NAME || "card-transactions",
      };

      const { Items } = await this.db.scan(params).promise();

      if (!Items || Items.length === 0) {
        return [];
      }

      const result: TransactionOutputDTO[] = Items?.map((item) => {
        const { amount, type } = item;
        const transaction = new TransactionCardFactory().create(amount, type);
        return {
          idempotencyId: transaction.idempotencyId,
          amount: transaction.amount,
          type: transaction.type,
        };
      });

      return result;
    } catch (error) {
      throw new Error(`Erro ao buscar transações: ${error}`);
    }
  }
}
