import { type QueryBuilder } from "@cgarciagarcia/react-query-builder";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/Api/Endpoints";
import { presentValidationErrors } from "@/Helpers/ApiErrorHelper";
import { type TransactionsAlias } from "@/Pages";
import { useAuthStore } from "@/Stores/useAuthStore";
import {
  type BaseApiError,
  type ValidationErrorResponse,
} from "@/Types/ApiTypes";

const transactionKeyFactory = createQueryKeys("transactions", {
  getTransaction: (token: string, query: QueryBuilder) => ({
    queryFn: () => getTransactions(query.build()),
    queryKey: [token, ...query.toArray()],
  }),
});

export const useTransaction = () => {
  const credentials = useAuthStore((s) => s.credentials);
  const queryClient = useQueryClient();

  const useGetTransactions = (query: QueryBuilder<TransactionsAlias>) =>
    useQuery(
      transactionKeyFactory.getTransaction(credentials.access_token, query),
    );

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    mutationKey: ["deleteTransactions"],
    onSuccess: () => {
      console.log(transactionKeyFactory.getTransaction._def);
      void queryClient.invalidateQueries({
        queryKey: transactionKeyFactory.getTransaction._def,
      });
      toast.success(`Transaction has been deleted`);
    },
  });

  const createMutation = useMutation({
    mutationFn: createTransaction,
    mutationKey: transactionKeyFactory.getTransaction._def,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: transactionKeyFactory.getTransaction._def,
      });
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
      void queryClient.invalidateQueries({
        queryKey: transactionKeyFactory.getTransaction._def,
      });
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
