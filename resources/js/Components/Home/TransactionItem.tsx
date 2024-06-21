import { memo } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

import { Text } from "@/Components/Layout/Text";
import { TransactionsTypes, type Transaction } from "@/Types";

export interface TransactionItemProps {
  transaction: Transaction;
  setTransactionToDelete: (transaction: Transaction) => void;
  setTransactionToEdit: (transaction: Transaction) => void;
}

export const TransactionItem = memo(function TransactionItemMemo({
  transaction,
  setTransactionToDelete,
  setTransactionToEdit,
}: TransactionItemProps) {
  return (
    <article
      key={transaction.id}
      className="min-h-auto w-full p-4 transition-colors duration-200 first:rounded-t-lg last:border-b-2 last:border-black hover:!bg-primary-300/30"
    >
      <Text as="span" weight="bold">
        {format(
          new Date(transaction.date).getTime() +
            new Date(transaction.date).getTimezoneOffset() * 60000,
          "EEEE d MMM",
        )}
      </Text>
      <div className="flex items-center justify-between">
        <div>
          <Text>{transaction.description}</Text>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-end gap-3">
            <TrashIcon
              data-tooltip-id="tooltip"
              data-tooltip-content={`Delete transaction ${transaction.description}`}
              className="w-4 cursor-pointer"
              aria-hidden="false"
              tabIndex={0}
              onClick={() => setTransactionToDelete(transaction)}
              aria-label={`Delete transaction ${transaction.description} on ${format(new Date(), "EEEE d MMM")}`}
            />
            <PencilIcon
              data-tooltip-id="tooltip"
              data-tooltip-content={`Edit transaction ${transaction.description} `}
              className="w-4 cursor-pointer"
              aria-hidden="false"
              tabIndex={0}
              onClick={() => setTransactionToEdit(transaction)}
              aria-label={`Edit transaction ${transaction.description} on ${format(new Date(transaction.date), "EEEE d MMM")} `}
            />
          </div>
          <Text
            weight="medium"
            className={twMerge(
              transaction.type === TransactionsTypes.income
                ? "text-green-700"
                : "text-red-700",
            )}
          >
            {transaction.money.amount.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARG",
            })}
          </Text>
        </div>
      </div>
    </article>
  );
});
