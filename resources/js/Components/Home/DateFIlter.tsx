import { useState } from "react";
import { type QueryBuilder } from "@cgarciagarcia/react-query-builder";
import { endOfWeek, format, startOfWeek, subMonths, subYears } from "date-fns";
import { twMerge } from "tailwind-merge";

import { Text } from "@/Components/Layout/Text";
import { type TransactionsAlias } from "@/Pages";

const today = new Date();

interface FilterDate {
  label: string;
  value: string | [string, string];
  filter: string;
}

const RangeDates = [
  {
    label: "Today",
    value: format(today, "yyyy-MM-dd"),
    filter: "date",
  },
  {
    label: "This week",
    value: [
      format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd"),
      format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd"),
    ],
    filter: "between_dates",
  },
  {
    label: format(today, "LLLL"),
    value: format(today, "M"),
    filter: "month",
  },
  {
    label: "Last 3 months",
    value: [
      format(subMonths(today, 3), "yyyy-MM-dd"),
      format(today, "yyyy-MM-dd"),
    ],
    filter: "between_dates",
  },
  {
    label: "Last 6 months",
    value: [
      format(subMonths(today, 6), "yyyy-MM-dd"),
      format(today, "yyyy-MM-dd"),
    ],
    filter: "between_dates",
  },
  {
    label: "1 year ago",
    value: [
      format(subYears(today, 1), "yyyy-MM-dd"),
      format(today, "yyyy-MM-dd"),
    ],
    filter: "between_dates",
  },
] as const satisfies FilterDate[];

export interface DataFilterProps {
  queryBuilder: QueryBuilder<TransactionsAlias>;
}

export const DateFilter = ({ queryBuilder }: DataFilterProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    RangeDates[0].filter,
  );

  const onChangeDate = (date: FilterDate) => {
    queryBuilder.when(typeof date.value === "string", () => {
      queryBuilder.filter(date.filter, date.value);
    });
    queryBuilder.when(typeof date.value !== "string", () =>
      queryBuilder.filter(date.filter, [date.value[0], date.value[1]], true),
    );

    setSelectedDate(date.filter);
  };

  return (
    <section className="min-w-full overflow-x-auto">
      <div className="flex w-auto flex-row items-center gap-4">
        {RangeDates.map((date) => {
          return (
            <div
              className={twMerge(
                "flex flex-row items-center justify-center rounded-full border border-primary-200 bg-primary/70 p-2 text-white hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black",
                selectedDate === date.label && "bg-primary-300 text-white",
              )}
              tabIndex={0}
              role="button"
              aria-label={date.label}
              key={date.label}
              onKeyDown={() => null}
              onClick={() => onChangeDate(date)}
            >
              <Text
                as="span"
                weight="normal"
                wrap="nowrap"
                className="text-center !text-sm !leading-4"
              >
                {date.label}
              </Text>
            </div>
          );
        })}
      </div>
    </section>
  );
};
