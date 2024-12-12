import { useState, useCallback, useEffect } from "react";
import {
  depositByAccountNumber,
  getAllTransactionsByAccountNumber,
  withdrawByAccountNumber,
} from "../services/accountService";
import { Account } from "../types/Account";

export const useAccount = (initialAccount: Account) => {
  const [account, setAccount] = useState(initialAccount);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = useCallback(async () => {
    const data = await getAllTransactionsByAccountNumber(account.accountNumber);
    setTransactions(data);
  }, [account.accountNumber]);

  const depositFunds = async (amount: number) => {
    const data = await depositByAccountNumber(account.accountNumber, amount);
    if (data.error) {
      alert(data.error);
      return;
    }
    setAccount({
      accountNumber: data.account_number,
      name: data.name,
      amount: data.amount,
      type: data.type,
      creditLimit: data.credit_limit,
    });
    getTransactions();
  };

  const withdrawFunds = async (amount: number) => {
    const data = await withdrawByAccountNumber(account.accountNumber, amount);
    if (data.error) {
      alert(data.error);
      return;
    }

    setAccount({
      accountNumber: data.account_number,
      name: data.name,
      amount: data.amount,
      type: data.type,
      creditLimit: data.credit_limit,
    });
    getTransactions();
  };

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return {
    account,
    transactions,
    depositFunds,
    withdrawFunds,
    getTransactions,
  };
};
