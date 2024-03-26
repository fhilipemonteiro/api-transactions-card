import TransactionCardFactory from "../../../domain/transaction/factory/transaction-card.factory";
import TransactionRepository from "../../../infrastructure/repository/transaction.repository";
import SendMessageSQS from "../../sqs/sendMessage.sqs";
import TransactionInputDTO from "./transaction-input.dto";
import TransactionDTO from "./transaction.dto";
import { Response } from "express";

export default class TransactionService {
  private readonly transactionRepository: TransactionRepository;
  private readonly transactionCardFactory: TransactionCardFactory;

  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.transactionCardFactory = new TransactionCardFactory();
  }

  public async create(data: TransactionInputDTO, res: Response) {
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

    const { idempotencyId, amount, type } = this.transactionCardFactory.create(
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
