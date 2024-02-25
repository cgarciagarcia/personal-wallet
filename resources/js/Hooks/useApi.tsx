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

  const getTransactions = () =>
    apiV1.get<BaseApiAnswer<Transactions[]>>("/transactions", {
      headers: {
        Authorization: `Bearer ${session?.plainTextToken}`,
      },
    });

  return { sigIn, getTransactions };
};
