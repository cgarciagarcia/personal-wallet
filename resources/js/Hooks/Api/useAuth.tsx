import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import { forgotPassword, logout, signIn, signUp } from "@/Api/Endpoints";
import { presentValidationErrors } from "@/Helpers/ApiErrorHelper";
import { useAuthStore } from "@/Stores/useAuthStore";
import {
  type BaseApiError,
  type ValidationErrorResponse,
} from "@/Types/ApiTypes";

export const useAuth = () => {
  const clearCredentials = useAuthStore((s) => s.logout);
  const setAuth = useAuthStore((s) => s.setAuth);

  const useSignIn = useMutation({
    mutationFn: signIn,
    onSuccess: ({ data }) => {
      setAuth(data.data);
    },
    onError: (response: AxiosError<BaseApiError<ValidationErrorResponse>>) => {
      if (response.response?.data) {
        toast.error(presentValidationErrors(response.response.data));
      }
    },
    mutationKey: ["sigIn"],
  });

  const useLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearCredentials();
    },
    onError: (response: AxiosError<BaseApiError<ValidationErrorResponse>>) => {
      if (response.response?.data) {
        toast.error(presentValidationErrors(response.response.data));
      }
    },
  });

  const useSignUp = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Your account has been successfully created.");
    },
    onError: (response: AxiosError<BaseApiError<ValidationErrorResponse>>) => {
      if (response.response?.data) {
        toast.error(presentValidationErrors(response.response.data));
      }
    },
    mutationKey: ["signUp"],
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    mutationKey: ["forgotPassword"],
    onSuccess: () => {
      toast.success(
        "We have sent you an email with instructions to reset your password.",
      );
    },
    onError: (response: AxiosError<BaseApiError<ValidationErrorResponse>>) => {
      if (response.response?.data) {
        toast.error(presentValidationErrors(response.response.data));
      }
    },
  });

  return {
    signIn: useSignIn,
    signUp: useSignUp,
    logout: useLogout,
    forgotPassword: forgotPasswordMutation,
  };
};
