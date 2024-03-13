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

  await TransactionService.create(params, res);
});
