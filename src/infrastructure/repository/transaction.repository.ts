import TransactionDTO from "../../application/services/transaction/transaction.dto";
import TransactionCard from "../../domain/transaction/entity/transaction-card";
import { DynamoDB } from "../config/aws/aws.config";

export default class TransactionRepository {
  db = DynamoDB();

  async findAll(): Promise<TransactionDTO[]> {
    try {
      const params = {
        TableName: process.env.DDB_TABLE_NAME || "card-transactions",
      };

      const { Items } = await this.db.scan(params).promise();

      if (!Items || Items.length === 0) {
        return [];
      }

      const result: TransactionDTO[] = Items?.map((item) => {
        const { idempotencyId, amount, type } = item;
        const transaction = new TransactionCard(idempotencyId, amount, type);
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
