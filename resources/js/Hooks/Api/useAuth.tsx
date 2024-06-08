import { useApi, type BaseApiAnswer } from "@/Hooks/Api/useApi";
import { useAuthStore } from "@/Stores/useAuthStore";
import { type Credentials, type User } from "@/Types";

export const useAuth = () => {
  const { api } = useApi();

  const clearCredentials = useAuthStore((s) => s.logout);

  const signIn = async (data: { email: string; password: string }) => {
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

  const logout = () => {
    clearCredentials();
    return api.delete("/logout");
  };

  return {
    signIn,
    signUp,
    logout,
  };
};
