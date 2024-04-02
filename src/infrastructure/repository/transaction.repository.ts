import TransactionOutputDTO from "../../application/services/transaction/transaction.dto";
import TransactionCardFactory from "../../domain/transaction/factory/transaction-card.factory";
import { dynamoClient } from "../config/aws/aws.config";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export default class TransactionRepository {
  private readonly transactionCardFactory: TransactionCardFactory;
  private readonly db: DynamoDBClient;

  constructor() {
    this.transactionCardFactory = new TransactionCardFactory();
    this.db = dynamoClient;
  }

  async findAll(): Promise<TransactionOutputDTO[]> {
    try {
      const params = {
        TableName: process.env.DDB_TABLE_NAME || "card-transactions",
      };

      const command = new ScanCommand(params);

      const { Items } = await this.db.send(command);

      if (!Items || Items.length === 0) {
        return [];
      }

      const result: TransactionOutputDTO[] = Items.map((item: any) => {
        const { idempotencyId, amount, type } = item;

        const amountValue = Number(amount.N);
        const typeValue = type.S;

        const transaction = new TransactionCardFactory().create(
          amountValue,
          typeValue
        );

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
