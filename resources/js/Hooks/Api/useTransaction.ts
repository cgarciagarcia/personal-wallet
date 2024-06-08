import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import { presentValidationErrors } from "@/Helpers/ApiErrorHelper";
import { useApi, type BaseApiAnswer } from "@/Hooks/Api/useApi";
import { useAuthStore } from "@/Stores/useAuthStore";
import { type Transaction } from "@/Types";
import {
  type BaseApiError,
  type ValidationErrorResponse,
} from "@/Types/ApiErrors";

export const useTransaction = () => {
  const { api } = useApi();
  const credentials = useAuthStore((s) => s.credentials);
  const queryClient = useQueryClient();

  const useGetTransactions = () =>
    useQuery({
      queryFn: () => api.get<BaseApiAnswer<Transaction[]>>("/transactions"),
      queryKey: ["getTransactions", credentials.refresh_token],
    });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return api.delete<BaseApiAnswer<Transaction[]>>(`/transactions/${id}`);
    },
    mutationKey: ["deleteTransactions"],
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
      toast.success(`Transaction has been deleted`);
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: object) =>
      api.post<BaseApiAnswer<Transaction>>("/transactions", data),
    mutationKey: ["newTransaction"],
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
    },
    onError: (response: AxiosError<BaseApiError<ValidationErrorResponse>>) => {
      if (response.response?.data) {
        toast.error(presentValidationErrors(response.response.data));
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (
      data: object & {
        id: number;
        date: string;
        money: number;
        interval?: string;
        repetition_count?: number | string;
      },
    ) => api.put<BaseApiAnswer<Transaction>>(`/transactions/${data.id}`, data),
    mutationKey: ["updateTransaction"],
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
    },
    onError: (response: AxiosError<BaseApiError<ValidationErrorResponse>>) => {
      if (response.response?.data) {
        toast.error(presentValidationErrors(response.response.data));
      }
    },
  });

  return {
    getTransactions: useGetTransactions,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
