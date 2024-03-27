import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

import { Typography } from "@/Components/Layout/Typography";
import { type Transaction } from "@/Types";

export interface TransactionItemProps {
  transaction: Transaction;
  setTransactionToDelete: (transaction: Transaction) => void;
}

export const TransactionItem = ({
  transaction,
  setTransactionToDelete,
}: TransactionItemProps) => {
  return (
    <article
      key={transaction.id}
      className="min-h-auto w-full p-4 first:rounded-t-lg last:border-b-2 last:border-black hover:!bg-gray-300"
    >
      <Typography as="span" weight="bold">
        {format(new Date(transaction.date), "EEEE d MMM")}
      </Typography>
      <div className="flex items-center justify-between">
        <div>
          <Typography>{transaction.description}</Typography>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-end gap-3">
            <TrashIcon
              data-tooltip-id="tooltip"
              data-tooltip-content="Delete transaction"
              className="w-4 cursor-pointer"
              tabIndex={0}
              onClick={() => setTransactionToDelete(transaction)}
              aria-label={`Delete transaction ${transaction.description}`}
            />
            <PencilIcon
              data-tooltip-id="tooltip"
              data-tooltip-content="Edit transaction"
              className="w-4 cursor-pointer"
              tabIndex={0}
              aria-label={`Edit transaction ${transaction.description}`}
            />
          </div>
          <Typography
            weight="medium"
            className={twMerge(
              transaction.type === "inflows"
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {transaction.money.amount.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARG",
            })}
          </Typography>
        </div>
      </div>
    </article>
  );
};
