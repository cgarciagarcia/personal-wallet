import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button } from "@/Components/Layout/Button";
import { Header, Typography } from "@/Components/Layout/Typography";
import Modal from "@/Components/Modal";
import { useApi } from "@/Hooks/Api/useApi";
import { Indicator } from "@/Pages/Home/Indicator";
import { TransactionList } from "@/Pages/Home/TransactionList";
import { useAuthStore } from "@/Stores/useAuthStore";
import { type Transaction } from "@/Types";

export const HomePage = () => {
  const { credentials } = useAuthStore();
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction>();

  const queryClient = useQueryClient();
  const { getTransactions, deleteTransactions } = useApi();
  const { data: response } = useQuery({
    queryFn: getTransactions,
    queryKey: ["getTransactions", credentials.access_token],
  });
  const { mutate: deleteTransaction } = useMutation({
    mutationFn: deleteTransactions,
    mutationKey: [
      "deleteTransactions",
      transactionToDelete?.id,
      credentials.access_token,
    ],
    onSuccess: () => {
      toast.success(`Transaction has been deleted`);
      setTransactionToDelete(undefined);
      void queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
    },
  });

  return (
    <section className="mt-8 flex flex-col items-center justify-center px-4 md:px-12">
      <div className="flex w-full flex-col-reverse justify-center gap-4 md:flex-row md:gap-6 lg:gap-24">
        <aside>
          <Header as="h1" weight="extrabold" className="mb-4">
            Transactions
          </Header>
          <TransactionList
            transactions={response?.data.data ?? []}
            setTransactionToDelete={setTransactionToDelete}
          />
        </aside>
        <aside>
          <Header as="h1" weight="extrabold" className="mb-4">
            Balance
          </Header>
          <Indicator transactions={response?.data?.data ?? []} />
        </aside>
      </div>
      <Modal
        show={transactionToDelete !== undefined}
        onClose={() =>
          setTimeout(() => {
            setTransactionToDelete(undefined);
          }, 500)
        }
      >
        <div className="flex flex-col items-center">
          <Typography className="mb-4" wrap="nowrap">
            Are you sure you want delete{" "}
            <strong>{transactionToDelete?.description}</strong> transaction?
          </Typography>
          <Button
            variant="complementary"
            className=""
            onClick={() => deleteTransaction(transactionToDelete!.id)}
          >
            Accept
          </Button>
        </div>
      </Modal>
    </section>
  );
};
