import { useState } from "react";
import {
  useQueryBuilder,
  type BaseConfig,
} from "@cgarciagarcia/react-query-builder";
import { PlusIcon } from "@heroicons/react/20/solid";

import {
  DateFilter,
  Indicator,
  ModalDeleteTransaction,
  ModalTransaction,
  Title,
  TransactionList,
} from "@/Components";
import { useTransaction } from "@/Hooks";
import { type Transaction } from "@/Types";

export interface TransactionsAlias {
  transaction: "t";
  user: "u";
}

export const TransactionConfig: BaseConfig<TransactionsAlias> = {
  pruneConflictingFilters: {
    date: ["between_dates", "month"],
    between_dates: ["month", "between_dates"],
  },
};

export const HomePage = () => {
  const [showAddOperation, setShowAddOperation] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction>();
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction>();
  const queryBuilder = useQueryBuilder(TransactionConfig);

  const { data: response, isFetching } =
    useTransaction().getTransactions(queryBuilder);
  const useDeleteTransaction = useTransaction().deleteMutation;

  return (
    <section className="mt-8 flex flex-col items-center justify-center px-4 md:px-12">
      <div className="flex w-full flex-col-reverse justify-center gap-4 md:gap-6 lg:flex-row lg:gap-14">
        <aside className="lg:max-w-[60%]">
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
            <DateFilter queryBuilder={queryBuilder} />
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
