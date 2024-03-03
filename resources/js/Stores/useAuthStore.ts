import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type Credentials } from "@/Types";

export interface AuthStore {
  credentials: Credentials;
  setAuth: (credentials: Credentials) => void;
  refreshAccessToken: (accessToken: string) => void;
  logout: () => void;
}

export const emptyCredentials = {
  access_token: "",
  refresh_token: "",
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      credentials: emptyCredentials,
      setAuth: (credentials: Credentials) => {
        set({ credentials });
      },
      refreshAccessToken: (accessToken) => {
        set({
          credentials: { ...get().credentials, access_token: accessToken },
        });
      },
      logout: () => {
        set({ credentials: emptyCredentials });
      },
    }),
    {
      name: "session_store",
    },
  ),
);
