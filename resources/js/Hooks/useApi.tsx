import axios from "axios";

import { env } from "@/env";

const apiV1 = axios.create({
  baseURL: env.VITE_API_URL + "/api/v1",
});

export interface BaseApiAnswer<T> {
  data: T;
  success: boolean;
  status: number;
}

export interface Transactions {
  id: number;
  money: {
    amount: number;
  };
}

export const useApi = () => {
  const getTransactions = () =>
    apiV1.get<BaseApiAnswer<Transactions[]>>("/users/1/transactions");

  return { getTransactions };
};
