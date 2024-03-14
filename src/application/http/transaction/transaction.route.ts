import { Router } from "express";
import TransactionDTO from "../../services/transaction/transaction.dto";
import TransactionService from "../../services/transaction/transaction.service";

export const route = Router();

route.post("/payments/card", async (req, res) => {
  const body: TransactionDTO = req.body;

  const params = {
    amount: body.amount,
    type: body.type,
  };

  const transactionService = new TransactionService();

  const result = transactionService.create(params, res);

  return result;
});

route.get("/payments/card", async (req, res) => {
  const transactionService = new TransactionService();

  const result = transactionService.findAll(res);

  return result;
});
