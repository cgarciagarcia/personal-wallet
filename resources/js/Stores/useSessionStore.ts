import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Session {
  accessToken: {
    expires_at: string;
  };
  plainTextToken: string;
}

export interface SessionStore {
  session: Session;
  setSession: (session: Session) => void;
}

const emptyCredentials = {
  accessToken: {
    expires_at: "",
  },
  plainTextToken: "",
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, _get) => ({
      session: emptyCredentials,
      setSession: (session: Session) => {
        set({ session });
      },
    }),
    {
      name: "session_store",
    },
  ),
);
