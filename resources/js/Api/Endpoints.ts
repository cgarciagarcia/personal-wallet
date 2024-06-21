import axios, { type AxiosError } from "axios";

import { api } from "@/Api/axios";
import { env } from "@/env";
import { useAuthStore } from "@/Stores/useAuthStore";
import {
  type Credentials,
  type NewTransaction,
  type Transaction,
  type User,
} from "@/Types";
import { type BaseApiAnswer } from "@/Types/ApiTypes";

interface SignInParams {
  email: string;
  password: string;
}

export const signIn = async (data: SignInParams) =>
  api.post<BaseApiAnswer<Credentials>>("/login", data);

interface SignUpParams {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export const signUp = (data: SignUpParams) =>
  api.post<BaseApiAnswer<User>>("/users", data);

export const logout = () => api.delete("/logout");

export const refreshAccessToken = async () => {
  const credentials = useAuthStore.getState().credentials;

  return axios
    .post<BaseApiAnswer<{ access_token: string }>>(
      env.VITE_API_URL + "/api/v1/refresh-access-token",
      null,
      {
        headers: {
          Authorization: `Bearer ${credentials.refresh_token}`,
        },
      },
    )
    .catch((error: AxiosError) => error);
};

export const getTransactions = (params: string) =>
  api.get<BaseApiAnswer<Transaction[]>>(`/transactions${params}`);

export const createTransaction = (data: NewTransaction) =>
  api.post<BaseApiAnswer<Transaction>>("/transactions", data);
export const updateTransaction = (
  data: object & {
    id: number;
    date: string;
    money: number;
    interval?: string;
    repetition_count?: number | string;
  },
) => api.put<BaseApiAnswer<Transaction>>(`/transactions/${data.id}`, data);

export const deleteTransaction = (id: number) =>
  api.delete<BaseApiAnswer<Transaction[]>>(`/transactions/${id}`);

export const forgotPassword = (email: string) =>
  api.post<BaseApiAnswer<void>>("/forgot-password", { email });
