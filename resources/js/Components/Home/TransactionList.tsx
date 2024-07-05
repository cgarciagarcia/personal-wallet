import { TransactionItem, TransactionItemSkeleton } from "@/Components/Home/";
import { Table } from "@/Components/Table/Table";
import { type Transaction } from "@/Types";

interface TransactionListProps {
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
    <Table
      isFetching={isFetching}
      fallbackElement={TransactionItemSkeleton}
      fallbackRepetitions={10}
    >
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          setTransactionToDelete={setTransactionToDelete}
          setTransactionToEdit={setTransactionToEdit}
        />
      ))}
    </Table>
  );
};
