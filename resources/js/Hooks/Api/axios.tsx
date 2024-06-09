import axios, { type AxiosError } from "axios";
import { toast } from "react-toastify";

import { env } from "@/env";
import { refreshAccessToken } from "@/Hooks/Api/Endpoints";
import { useAuthStore } from "@/Stores/useAuthStore";

export const api = axios.create({
  baseURL: env.VITE_API_URL + "/api/v1",
  headers: {
    Accept: "application/json",
  },
});

const refreshAccessTokenStore = useAuthStore.getState().refreshAccessToken;
const logout = useAuthStore.getState().logout;
api.interceptors.request.use((request) => {
  const credentials = useAuthStore.getState().credentials;
  if (
    credentials.refresh_token &&
    credentials.access_token &&
    !request.headers.has("Retried")
  ) {
    request.headers.set("Authorization", "Bearer " + credentials.access_token);
  }
  return request;
});

api.interceptors.response.use(
  (response) => response,
  async function (error: AxiosError) {
    const originalRequest = { _retry: false, ...error.config };

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const response = await refreshAccessToken();

      if (!axios.isAxiosError(response)) {
        refreshAccessTokenStore(response.data.data.access_token);
        originalRequest.headers?.set(
          "Authorization",
          `Bearer ${response.data.data.access_token}`,
        );
        originalRequest.headers?.set("Retried", true);
        return api(originalRequest);
      }
      toast.info("Your session has expired. please login again");
      logout();
    }

    return Promise.reject(error);
  },
);
