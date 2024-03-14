import TransactionCard from "../../../domain/transaction/entity/transaction-card";
import TransactionRepository from "../../../infrastructure/repository/transaction.repository";
import SendMessageSQS from "../../sqs/sendMessage.sqs";
import TransactionDTO from "./transaction.dto";
import { Response } from "express";
import { v4 as uuid } from "uuid";

interface TransactionCardInterface {
  idempotencyId: string;
  amount: number;
  type: string;
}

export default class TransactionService {
  private readonly transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  public async create(data: TransactionDTO, res: Response) {
    if (data.amount === undefined) {
      return res.status(400).json({
        message: "amount is required",
      });
    } else if (typeof data.amount !== "number") {
      return res.status(400).json({
        message: "amount must be a number",
      });
    }

    if (data.type === undefined) {
      return res.status(400).json({
        message: "type is required",
      });
    } else if (typeof data.type !== "string") {
      return res.status(400).json({
        message: "type must be a string",
      });
    } else if (data.type !== "credit" && data.type !== "debit") {
      return res.status(400).json({
        message: "type must be credit or debit",
      });
    }

    const { idempotencyId, amount, type } = new TransactionCard(
      uuid(),
      data.amount,
      data.type
    );

    const transaction = {
      idempotencyId,
      amount,
      type,
    };

    try {
      await SendMessageSQS(transaction);
      return res.status(200).send();
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  public async findAll(res: Response): Promise<TransactionDTO[] | Response> {
    try {
      const transactions: TransactionDTO[] =
        await this.transactionRepository.findAll();
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).send();
    }
  }
}
