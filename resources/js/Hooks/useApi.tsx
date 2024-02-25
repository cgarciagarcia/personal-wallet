import axios from "axios";

import { env } from "@/env";
import { useSessionStore } from "@/Stores/useSessionStore";

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

export interface Credentials {
  accessToken: {
    expires_at: string;
  };
  plainTextToken: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const emptyCredentials = {
  accessToken: {
    expires_at: "",
  },
  plainTextToken: "",
};
export const useApi = () => {
  const { session, setSession } = useSessionStore();
  const sigIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await axios.get("sanctum/csrf-cookie");

    await apiV1
      .post<BaseApiAnswer<Credentials>>("/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setSession(res.data.data);
        } else {
          setSession(emptyCredentials);
        }
      });

    return !!session.plainTextToken;
  };
  const signUp = (data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    return apiV1.post<BaseApiAnswer<User>>("/users", data);
  };
  const getTransactions = () =>
    apiV1.get<BaseApiAnswer<Transactions[]>>("/transactions", {
      headers: {
        Authorization: `Bearer ${session?.plainTextToken}`,
      },
    });

  const clearSession = () => {
    setSession(emptyCredentials);
  };

  return { sigIn, signUp, getTransactions, clearSession };
};
