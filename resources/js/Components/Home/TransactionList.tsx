import { TransactionItem } from "@/Components/Home/TransactionItem";
import { TransactionItemSkeleton } from "@/Components/Home/TransactionItemSkeleton";
import { type Transaction } from "@/Types";

export interface TransactionListProps {
  transactions: Transaction[];
  setTransactionToDelete: (transaction: Transaction) => void;
  setTransactionToEdit: (transaction: Transaction) => void;
  isFetching: boolean;
}

export const TransactionList = ({
  transactions,
  setTransactionToDelete,
  setTransactionToEdit,
  isFetching,
}: TransactionListProps) => {
  return (
    <div className="flex-flex-col h-[600px] w-full overflow-y-auto rounded-lg border border-solid border-primary-600 bg-gray-100 shadow-xl md:w-[500px] [&>*:nth-child(even)]:bg-gray-200">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            setTransactionToDelete={setTransactionToDelete}
            setTransactionToEdit={setTransactionToEdit}
          />
        ))
      ) : transactions.length == 0 && !isFetching ? (
        <article className="min-h-auto w-full p-4 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-200">
          <div className="flex items-center justify-between">
            Nothing to show...
          </div>
        </article>
      ) : (
        <>
          <TransactionItemSkeleton />
          <TransactionItemSkeleton />
          <TransactionItemSkeleton />
          <TransactionItemSkeleton />
          <TransactionItemSkeleton />
        </>
      )}
    </div>
  );
};
