import axios from "axios";

import { env } from "@/env";
import { useRefreshToken } from "@/Hooks/Api/useRefresh";
import { useAuthStore } from "@/Stores/useAuthStore";
import { type Credentials, type Transactions, type User } from "@/Types";

export interface BaseApiAnswer<T> {
  data: T;
  success: boolean;
  status: number;
}

const api = axios.create({
  baseURL: env.VITE_API_URL + "/api/v1",
  headers: {
    Accept: "application/json",
  },
});

export const useApi = () => {
  const { logout } = useAuthStore();

  useRefreshToken(api);

  const signIn = async (data: { email: string; password: string }) => {
    await axios.get("sanctum/csrf-cookie");
    return api.post<BaseApiAnswer<Credentials>>("/login", data);
  };
  const signUp = (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }) => {
    return api.post<BaseApiAnswer<User>>("/users", data);
  };
  const getTransactions = () =>
    api.get<BaseApiAnswer<Transactions[]>>("/transactions");

  return { signIn, signUp, getTransactions, logout };
};
