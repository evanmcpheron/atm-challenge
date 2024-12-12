import { getAccount } from "../handlers/accountHandler";
import { transactions } from "../handlers/transactionHandler";
import { TransactionType } from "../types";

export class ValidationService {
  async validateDeposit(accountNumber: string, amount: number) {
    const account = await getAccount(accountNumber);
    if (!account) throw new Error("Account does not exist");
    if (account.type === "credit") {
      if (account.amount + amount > 0) {
        throw new Error("Cannot pay your balance below 0");
      }
    }
    if (amount < 0) throw new Error("Amount must be greater than 0");
    if (amount > 1000) throw new Error("Maximum deposit amount is $1,000");
    return true;
  }

  async validateWithdrawal(accountNumber: string, amount: number) {
    const accountTransactionsResult = await transactions(accountNumber);
    const accountTransactions = accountTransactionsResult.rows;

    if (amount > 200) throw new Error("Maximum withdrawal amount is $200");
    if (amount < 0) throw new Error("Amount must be greater than 0");
    if (amount % 5 !== 0) throw new Error("Amount must be a multiple of $5");

    const account = await getAccount(accountNumber);
    if (!account) throw new Error("Account does not exist");

    if (account.type === "credit") {
      if (Math.abs(account.amount - amount) > account.credit_limit) {
        throw new Error("Cannot withdraw more than credit limit");
      }
    }

    if (account.type !== "credit" && account.amount < amount)
      throw new Error("Insufficient funds");

    const now = new Date();
    const last24HoursTransactions = accountTransactions.filter(
      (transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate > new Date(now.getTime() - 24 * 60 * 60 * 1000);
      }
    );

    const totalWithdrawn = last24HoursTransactions
      .filter((transaction) => transaction.type === TransactionType.WITHDRAWAL)
      .reduce((total, transaction) => total + transaction.amount, 0);

    if (totalWithdrawn + amount > 400) {
      throw new Error("Cannot withdraw more than $400 in a 24 hour period");
    }
    return true;
  }
}
