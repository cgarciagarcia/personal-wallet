import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type QueryBuilder } from "@vortechron/query-builder-ts";
import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/Api/Endpoints";
import { presentValidationErrors } from "@/Helpers/ApiErrorHelper";
import { useAuthStore } from "@/Stores/useAuthStore";
import {
  type BaseApiError,
  type ValidationErrorResponse,
} from "@/Types/ApiTypes";

export const useTransaction = () => {
  const credentials = useAuthStore((s) => s.credentials);
  const queryClient = useQueryClient();

  const useGetTransactions = (query: QueryBuilder) =>
    useQuery({
      queryFn: () => getTransactions(query.build()),
      queryKey: ["getTransactions", [credentials.refresh_token, query.build()]],
    });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    mutationKey: ["deleteTransactions"],
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
      toast.success(`Transaction has been deleted`);
    },
  });

  const createMutation = useMutation({
    mutationFn: createTransaction,
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
    mutationFn: updateTransaction,
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
