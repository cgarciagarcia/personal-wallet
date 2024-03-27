import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Header, Typography } from "@/Components/Layout/Typography";
import { type Transaction } from "@/Types";

export interface IndicatorProps {
  transactions: Transaction[];
}

export const Indicator = ({ transactions }: IndicatorProps) => {
  const [incomes, setIncomes] = useState<number>(0);
  const [outgoings, setOutgoings] = useState<number>(0);

  useEffect(() => {
    const income = transactions
      .filter((t) => t.type === "inflows")
      ?.map((t) => t.money.amount)
      ?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    setIncomes(income ?? 0);
    const out = transactions
      .filter((t) => t.type === "outflows")
      ?.map((t) => t.money.amount)
      ?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    setOutgoings(out ?? 0);
  }, [transactions]);

  return (
    <section className="h-auto w-max  rounded-lg border border-solid border-black bg-gray-100 p-8 md:w-[150px] md:p-4 lg:w-[300px] lg:p-8">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Header as="h5">Incomes: </Header>
          <Typography weight="medium" className={twMerge("text-green-500")}>
            {incomes}
          </Typography>
        </div>
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Header as="h5">Outcomes: </Header>
          <Typography weight="medium" className={twMerge("text-red-500")}>
            {outgoings}
          </Typography>
        </div>
        <hr className="my-2 border border-gray-300 md:my-0 lg:my-2" />
        <div className="flex flex-row justify-between gap-4 md:gap-0 lg:flex-row lg:gap-4">
          <Header as="h5">Result: </Header>
          <Typography
            weight="medium"
            className={twMerge(
              incomes - outgoings > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {incomes - outgoings}
          </Typography>
        </div>
      </div>
    </section>
  );
};
