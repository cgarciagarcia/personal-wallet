import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import { Header, Typography } from "@/Components/Layout/Typography";
import { TransactionsTypes, type Transaction } from "@/Types";

export interface IndicatorProps {
  transactions: Transaction[];
  isFetching: boolean;
}

export const Indicator = ({ transactions, isFetching }: IndicatorProps) => {
  const [incomes, setIncomes] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  useEffect(() => {
    const income = transactions
      .filter((t) => t.type === TransactionsTypes.income)
      .map((t) => t.money.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setIncomes(income ?? 0);

    const outcomes = transactions
      .filter((t) => t.type === TransactionsTypes.outcome)
      .map((t) => t.money.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    setExpenses(outcomes ?? 0);
  }, [transactions]);

  return (
    <section className="border-style h-auto w-max bg-gray-100 p-8 md:min-w-[150px] md:p-4 lg:w-[300px] lg:p-8">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Header as="h5">Incomes: </Header>
          <Typography weight="medium" className={twMerge("text-green-500")}>
            {isFetching ? <Skeleton width={50} /> : incomes}
          </Typography>
        </div>
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Header as="h5">Expenses: </Header>
          <Typography weight="medium" className={twMerge("text-red-500")}>
            {isFetching ? <Skeleton width={50} /> : expenses}
          </Typography>
        </div>
        <hr className="my-2 border border-gray-300 md:my-0 lg:my-2" />
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Header as="h5">Outcome: </Header>
          <Typography
            weight="medium"
            className={twMerge(
              incomes - expenses > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {isFetching ? <Skeleton width={50} /> : incomes - expenses}
          </Typography>
        </div>
      </div>
    </section>
  );
};
