import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

import { Indicator } from "@/Components/Home/Indicator";
import { ModalDeleteTransaction } from "@/Components/Home/ModalDeleteTransaction";
import { ModalTransaction } from "@/Components/Home/ModalTransaction";
import { TransactionList } from "@/Components/Home/TransactionList";
import { Header } from "@/Components/Layout/Typography";
import { useTransaction } from "@/Hooks/Api/useTransaction";
import { type Transaction } from "@/Types";

export const HomePage = () => {
  const [showAddOperation, setShowAddOperation] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction>();
  const [transactionSelected, setTransactionSelected] = useState<Transaction>();

  const { data: response, isFetching } = useTransaction().getQuery;
  const useDeleteTransaction = useTransaction().deleteMutation;

  return (
    <section className="mt-8 flex flex-col items-center justify-center px-4 md:px-12">
      <div className="flex w-full flex-col-reverse justify-center gap-4 md:flex-row md:gap-6 lg:gap-24">
        <aside>
          <div className="flex flex-row justify-between">
            <Header
              as="h1"
              weight="extrabold"
              className="mb-4 underline decoration-primary-500 underline-offset-2"
            >
              Transactions
            </Header>
            <div>
              <div
                data-tooltip-id="tooltip"
                data-tooltip-content="Add operation"
                aria-label="Add operation "
                tabIndex={0}
                role="button"
                onClick={() => setShowAddOperation(true)}
                onKeyDown={() => null}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-complementary hover:bg-complementary-400"
              >
                <PlusIcon className="h-6 w-6 text-white hover:text-gray-300" />
              </div>
            </div>
          </div>
          <TransactionList
            transactions={response?.data.data ?? []}
            setTransactionToDelete={setTransactionToDelete}
            setTransactionToEdit={(transaction) => {
              setTransactionSelected(transaction);
              setShowAddOperation(true);
            }}
            isFetching={isFetching}
          />
        </aside>
        <aside>
          <Header as="h1" weight="extrabold" className="mb-4">
            Balance
          </Header>
          <Indicator
            transactions={response?.data?.data ?? []}
            isFetching={isFetching}
          />
        </aside>
      </div>
      <ModalDeleteTransaction
        transaction={transactionToDelete}
        onClose={() =>
          setTimeout(() => {
            setTransactionToDelete(undefined);
          }, 1000)
        }
        onAccept={() => {
          useDeleteTransaction.mutate(transactionToDelete!.id, {
            onSuccess: () => {
              setTransactionToDelete(undefined);
            },
          });
        }}
        isPending={useDeleteTransaction.isPending}
      />
      <ModalTransaction
        transaction={transactionSelected}
        show={showAddOperation}
        onSuccess={() => {
          setTransactionSelected(undefined);
          setShowAddOperation(false);
        }}
        onClose={() => {
          setTransactionSelected(undefined);
          setShowAddOperation(false);
        }}
      />
    </section>
  );
};
