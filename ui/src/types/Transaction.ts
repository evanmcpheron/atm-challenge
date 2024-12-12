export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

export type Transaction = {
  id: number;
  account_number: number;
  amount: number;
  date: string;
  type: TransactionType;
};
