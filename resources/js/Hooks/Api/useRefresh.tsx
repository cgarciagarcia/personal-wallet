import { useCallback, useEffect } from "react";
import axios, { type AxiosError, type AxiosInstance } from "axios";
import { toast } from "react-toastify";

import { env } from "@/env";
import { type BaseApiAnswer } from "@/Hooks/Api/useApi";
import { useAuthStore } from "@/Stores/useAuthStore";
import {
  type BaseApiError,
  type ValidationErrorResponse,
} from "@/Types/ApiErrors";

export const useRefreshToken = (api: AxiosInstance) => {
  const credentials = useAuthStore((s) => s.credentials);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const refreshAccessToken = useAuthStore((s) => s.refreshAccessToken);

  const renewToken = useCallback(
    async () =>
      axios
        .post<BaseApiAnswer<{ access_token: string }>>(
          env.VITE_API_URL + "/api/v1/refresh-access-token",
          null,
          {
            headers: {
              Authorization: `Bearer ${credentials.refresh_token}`,
            },
          },
        )
        .catch(
          (error: AxiosError<BaseApiError<ValidationErrorResponse>>) => error,
        ),
    [credentials.refresh_token],
  );

  const renew = useCallback(async () => {
    const response = await renewToken();
    if (!axios.isAxiosError(response)) {
      refreshAccessToken(response.data.data.access_token);
    } else {
      toast.info("Your session has expired. please login again");
      logout();
    }
    return response;
  }, [logout, refreshAccessToken, renewToken]);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((request) => {
      if (
        credentials.refresh_token &&
        credentials.access_token &&
        !request.headers.has("Retried")
      ) {
        request.headers.set(
          "Authorization",
          "Bearer " + credentials.access_token,
        );
      }
      return request;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async function (error: AxiosError) {
        const originalRequest = { _retry: false, ...error.config };

        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const response = await renew();

          if (!axios.isAxiosError(response)) {
            originalRequest.headers?.set(
              "Authorization",
              `Bearer ${response.data.data.access_token}`,
            );
            originalRequest.headers?.set("Retried", true);
            console.log("aqui sali1");
            return api(originalRequest);
          }
          console.log("aqui sali");
          return;
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [api, credentials, refreshAccessToken, renew, setAuth]);
};
