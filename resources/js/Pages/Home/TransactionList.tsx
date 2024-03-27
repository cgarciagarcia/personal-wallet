import { TransactionItem } from "@/Pages/Home/TransactionItem";
import { type Transaction } from "@/Types";

export interface TransactionListProps {
  transactions: Transaction[];
  setTransactionToDelete: (transaction: Transaction) => void;
}

export const TransactionList = ({
  transactions,
  setTransactionToDelete,
}: TransactionListProps) => {
  return (
    <div className="flex-flex-col h-[600px] w-full overflow-y-auto rounded-lg border border-solid border-primary-600 bg-gray-100 shadow-xl md:w-[500px] [&>*:nth-child(even)]:bg-gray-200">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            setTransactionToDelete={setTransactionToDelete}
          />
        ))
      ) : (
        <article className="min-h-auto w-full p-4 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-200">
          <div className="flex items-center justify-between">
            Nothing to show...
          </div>
        </article>
      )}
    </div>
  );
};
