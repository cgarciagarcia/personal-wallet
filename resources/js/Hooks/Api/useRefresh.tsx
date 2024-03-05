import { useCallback, useEffect } from "react";
import { type AxiosError, type AxiosInstance } from "axios";

import { type BaseApiAnswer } from "@/Hooks/Api/useApi";
import { emptyCredentials, useAuthStore } from "@/Stores/useAuthStore";

export const useRefreshToken = (api: AxiosInstance) => {
  const { credentials, setAuth, logout, refreshAccessToken } = useAuthStore();

  const renewToken = useCallback(
    async (refreshToken: string) =>
      api.post<BaseApiAnswer<{ access_token: string }>>(
        "/refresh-access-token",
        null,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      ),
    [api],
  );

  const renew = useCallback(async () => {
    const response = await renewToken(credentials.refresh_token);
    if (response.status === 200) {
      refreshAccessToken(response.data.data.access_token);
    } else {
      logout();
    }
    return response;
  }, [credentials, logout, refreshAccessToken, renewToken]);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((request) => {
      if (
        credentials.refresh_token &&
        credentials.access_token &&
        !request.headers.has("Retried")
      ) {
        if (request.url?.includes("refresh-access-token")) {
          request.headers.set(
            "Authorization",
            "Bearer " + credentials.refresh_token,
          );
        } else {
          request.headers.set(
            "Authorization",
            "Bearer " + credentials.access_token,
          );
        }
      }
      return request;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async function (error: AxiosError) {
        const originalRequest = { _retry: false, ...error.config };

        if (error?.response?.config?.url?.includes("refresh-access-token")) {
          setAuth(emptyCredentials);
        }

        if (
          error?.response?.status === 401 &&
          !originalRequest._retry &&
          !error?.response?.config?.url?.includes("refresh-access-token")
        ) {
          originalRequest._retry = true;

          const response = await renew();

          if (response.status !== 200) {
            return Promise.reject(error);
          }

          originalRequest.headers?.set(
            "Authorization",
            `Bearer ${response.data.data.access_token}`,
          );
          originalRequest.headers?.set("Retried", true);
          return api(originalRequest);
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
