import { api, type BaseApiAnswer } from "@/Hooks/Api/useApi";
import { type Credentials, type User } from "@/Types";

interface SignInParams {
  email: string;
  password: string;
}

export const signIn = async (data: SignInParams) =>
  api.post<BaseApiAnswer<Credentials>>("/login", data);

interface SignUpParams {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export const signUp = (data: SignUpParams) =>
  api.post<BaseApiAnswer<User>>("/users", data);

export const logout = () => api.delete("/logout");
