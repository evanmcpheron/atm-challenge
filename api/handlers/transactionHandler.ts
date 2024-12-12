import { query } from "../utils/db";
import { getAccount } from "./accountHandler";

export const withdrawal = async (accountID: string, amount: number) => {
  const account = await getAccount(accountID);

  account.amount -= amount;
  const res = await query(
    `
    UPDATE accounts
    SET amount = $1 
    WHERE account_number = $2`,
    [account.amount, accountID]
  );

  await query(
    `
    INSERT INTO transactions (account_number, amount, date, type)
    VALUES ($1, $2, NOW(), 'withdrawal')`,
    [accountID, amount]
  );

  if (res.rowCount === 0) {
    throw new Error("Transaction failed");
  }

  return account;
};

export const deposit = async (accountID: string, amount: number) => {
  const account = await getAccount(accountID);

  account.amount += amount;
  const res = await query(
    `
    UPDATE accounts
    SET amount = $1 
    WHERE account_number = $2`,
    [account.amount, accountID]
  );

  await query(
    `
    INSERT INTO transactions (account_number, amount, date, type)
    VALUES ($1, $2, NOW(), 'deposit')`,
    [accountID, amount]
  );

  if (res.rowCount === 0) {
    throw new Error("Transaction failed");
  }

  return account;
};

export const transactions = async (accountID: string) => {
  const allTransactions = await query(
    `
    SELECT *
    FROM transactions
    WHERE account_number = $1`,
    [accountID]
  );

  return allTransactions;
};
