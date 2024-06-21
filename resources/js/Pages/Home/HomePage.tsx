import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { query } from "@vortechron/query-builder-ts";

import { DateFilter } from "@/Components/Home/DateFIlter";
import { Indicator } from "@/Components/Home/Indicator";
import { ModalDeleteTransaction } from "@/Components/Home/ModalDeleteTransaction";
import { ModalTransaction } from "@/Components/Home/ModalTransaction";
import { TransactionList } from "@/Components/Home/TransactionList";
import { Title } from "@/Components/Layout/Text";
import { useTransaction } from "@/Hooks/Api/useTransaction";
import { type Transaction } from "@/Types";

export const HomePage = () => {
  const [showAddOperation, setShowAddOperation] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction>();
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction>();

  const [queryBuilder, updateBuilder] = useState(query());

  const { data: response, isFetching } =
    useTransaction().getTransactions(queryBuilder);
  const useDeleteTransaction = useTransaction().deleteMutation;

  return (
    <section className="mt-8 flex flex-col items-center justify-center px-4 md:px-12">
      <div className="flex w-full flex-col-reverse justify-center gap-4 md:flex-row md:gap-6 lg:gap-24">
        <aside>
          <div className="mb-4 flex flex-col justify-between">
            <div className="flex flex-row items-center justify-between gap-8">
              <Title
                as="h1"
                weight="extrabold"
                className="title-underlined mb-4 underline-offset-2"
              >
                Transactions
              </Title>
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
            <DateFilter
              queryBuilder={queryBuilder}
              updateBuilder={updateBuilder}
            />
          </div>
          <TransactionList
            transactions={response?.data.data ?? []}
            setTransactionToDelete={setTransactionToDelete}
            setTransactionToEdit={(transaction) => {
              setTransactionToEdit(transaction);
              setShowAddOperation(true);
            }}
            isFetching={isFetching}
          />
        </aside>
        <aside>
          <Title as="h1" weight="extrabold" className="title-underlined mb-4">
            Balance
          </Title>
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
        transaction={transactionToEdit}
        show={showAddOperation}
        onSuccess={() => {
          setTransactionToEdit(undefined);
          setShowAddOperation(false);
        }}
        onClose={() => {
          setTransactionToEdit(undefined);
          setShowAddOperation(false);
        }}
      />
    </section>
  );
};
