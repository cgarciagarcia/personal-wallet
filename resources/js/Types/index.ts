export interface Transaction {
  id: number;
  type: TypeTransactionTypes;
  date: string;
  description: string;
  category_id: number;
  money: {
    amount: number;
  };
  interval?: TransactionsIntervalType;
  recurring: boolean;
  repetition_count?: number;
  created_at: string;
}

export interface NewTransaction {
  description: string;
  category_id?: number;
  type: string;
  date: string;
  recurring: boolean;
  repetition_count?: number | string;
  money: number;
  interval?: TransactionsIntervalType;
}

export interface Credentials {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export const TransactionsTypes = {
  income: "income",
  outcome: "outcome",
};

export type TypeTransactionTypes = keyof typeof TransactionsTypes;

export const Intervals = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  annually: "annually",
};

export type TransactionsIntervalType = keyof typeof Intervals;
