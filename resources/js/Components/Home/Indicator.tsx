import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import { Text } from "@/Components/Layout/Text";
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
    <section className="border-style h-auto w-max bg-white p-8 md:min-w-[150px] md:p-4 lg:w-[300px] lg:p-8">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Text as="span">Incomes:</Text>
          <Text weight="medium" className={twMerge("text-green-700")}>
            {isFetching ? <Skeleton width={50} /> : incomes}
          </Text>
        </div>
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Text as="span">Expenses:</Text>
          <Text weight="medium" className={twMerge("text-red-700")}>
            {isFetching ? <Skeleton width={50} /> : expenses}
          </Text>
        </div>
        <hr className="my-2 border border-gray-300 md:my-0 lg:my-2" />
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Text as="span">Outcome:</Text>
          <Text
            weight="medium"
            className={twMerge(
              incomes - expenses > 0 ? "text-green-700" : "text-red-700",
            )}
          >
            {isFetching ? <Skeleton width={50} /> : incomes - expenses}
          </Text>
        </div>
      </div>
    </section>
  );
};
