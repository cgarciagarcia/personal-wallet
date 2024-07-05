import { useState } from "react";
import { endOfWeek, format, startOfWeek, subMonths, subYears } from "date-fns";
import { twMerge } from "tailwind-merge";

import { Text } from "@/Components/Layout/Text";
import { type QueryBuilder } from "@/Hooks/useQueryBuilder/useQueryBuilder";

const today = new Date();

interface FilterDate {
  label: string;
  value: string | [string, string];
  filter: string;
}

const RangeDates = [
  {
    label: "Today",
    value: format(today, "yyyy-mm-dd"),
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
    label: "June",
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
  {
    label: "Custom",
    value: "custom",
    filter: "between_dates",
  },
] as const satisfies FilterDate[];

export interface DataFilterProps {
  queryBuilder: QueryBuilder;
}

export const DateFilter = ({ queryBuilder }: DataFilterProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    RangeDates[0].filter,
  );

  const onChangeDate = (date: FilterDate) => {
    if (typeof date.value === "string") {
      queryBuilder.clearFilters().filter(date.filter, [date.value, "05"]);
    } else {
      queryBuilder
        .clearFilters()
        .filter(date.filter, [date.value[0], date.value[1]]);
    }
    setSelectedDate(date.filter);
  };

  return (
    <section className="min-w-full overflow-scroll">
      <div className="flex w-auto flex-row items-center gap-4 md:justify-between md:overflow-x-hidden">
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
