import {
  usingAlias,
  type GlobalState,
} from "@/Hooks/useQueryBuilder/src/utils";

export type FilterValue = (string | number)[] | string | number;

export interface Filter {
  attribute: string;
  value: (string | number)[];
}

export type Alias<Prop> = {
  [key in keyof Prop]: Prop[key] extends string ? string : never;
};

export const filterAction = <Al extends Alias<object>, Attr extends string>(
  attribute: Attr,
  value: FilterValue,
  state: GlobalState<Al>,
) => {
  const alias = usingAlias(state, attribute);
  let prevFilter: Filter | undefined;

  const allFilters = state.filters.reduce((filters, filter) => {
    if (filter.attribute === alias) {
      prevFilter = filter;
      return filters;
    }
    return [...filters, filter];
  }, [] as Filter[]);

  const val = Array.isArray(value) ? value : [value];
  const newState: GlobalState<Al> = {
    ...state,
    filters: [
      ...allFilters,
      {
        attribute: attribute,
        value: [...(prevFilter?.value ?? []), ...val],
      },
    ],
  };
  return newState;
};

export const clearFilterAction = <Al>(state: GlobalState<Al>) => {
  return {
    ...state,
    filters: [],
  };
};
