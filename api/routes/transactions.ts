import express, { Request, Response } from "express";
import Joi, { Schema } from "joi";
import {
  deposit,
  withdrawal,
  transactions,
} from "../handlers/transactionHandler";
import { Transaction, TransactionType } from "../types";
import { ValidationService } from "../services/validationService";

const router = express.Router();
const validationService = new ValidationService();

const transactionSchema: Schema = Joi.object({
  amount: Joi.number().greater(0).required(),
});

router.get(
  "/:accountID/transactions",
  async (request: Request, response: Response) => {
    try {
      const accountTransactions = await transactions(request.params.accountID);
      return response.status(200).send(accountTransactions.rows);
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).send({ error: err.message });
      }
    }
  }
);

router.put(
  "/:accountID/withdraw",
  async (request: Request, response: Response) => {
    const { error } = transactionSchema.validate(request.body);

    if (error) {
      return response.status(400).send(error.details[0].message);
    }

    try {
      await validationService.validateWithdrawal(
        request.params.accountID,
        request.body.amount
      );

      const updatedAccount = await withdrawal(
        request.params.accountID,
        request.body.amount
      );
      return response.status(200).send(updatedAccount);
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).send({ error: err.message });
      }
    }
  }
);

router.put(
  "/:accountID/deposit",
  async (request: Request, response: Response) => {
    const { error } = transactionSchema.validate(request.body);

    if (error) {
      return response.status(400).send(error.details[0].message);
    }

    try {
      await validationService.validateDeposit(
        request.params.accountID,
        request.body.amount
      );

      const updatedAccount = await deposit(
        request.params.accountID,
        request.body.amount
      );
      return response.status(200).send(updatedAccount);
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).send({ error: err.message });
      }
    }
  }
);

export default router;
