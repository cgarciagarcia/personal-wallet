import axios from "axios";

import { env } from "@/env";
import { useRefreshToken } from "@/Hooks/Api/useRefresh";

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
  useRefreshToken(api);
  return {
    api,
  };
};
