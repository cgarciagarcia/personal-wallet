import { useReducer, useState } from "react";

import { type GlobalState } from "@/Hooks";
import {
  clearFilterAction,
  filterAction,
  type Alias,
  type Filter,
  type FilterValue,
} from "@/Hooks/useQueryBuilder/src/filter";

interface Action {
  type: string;
  payload: unknown;
}

const reducer = <Aliases extends Record<string, string>>(
  state: GlobalState<Aliases>,
  action: Action,
) => {
  switch (action?.type) {
    case "filter": {
      const filter = action.payload as Filter;
      return filterAction(filter.attribute, filter.value, state);
    }
    case "clear_filters": {
      return clearFilterAction(state);
    }
    default: {
      return { ...state };
    }
  }
};

const initialState = <
  AliasType extends Record<string, string> | NonNullable<unknown>,
>(): GlobalState<AliasType> => ({
  aliases: {} as Alias<AliasType>,
  filters: [],
});

export interface QueryBuilder<AliasType = NonNullable<unknown>> {
  filter: (
    attribute: keyof AliasType | string,
    value: FilterValue,
  ) => QueryBuilder<AliasType>;
  build: () => string;
  clearFilters: () => QueryBuilder<AliasType>;
}

interface QueryBuilderProps<
  AliasType extends Record<string, string> | NonNullable<unknown>,
> {
  aliases?: AliasType;
}

export const useQueryBuilder: <AlType extends Record<string, string>>(
  config?: QueryBuilderProps<AlType>,
) => QueryBuilder<AlType> = <AliasType extends Record<string, string>>(
  config = {} as QueryBuilderProps<AliasType>,
) => {
  const [init] = useState(() => initialState<AliasType>());
  const [state, dispatch] = useReducer(reducer, init, (init) => ({
    ...init,
    aliases: config?.aliases ?? ({} as AliasType),
  }));

  const builder: QueryBuilder<AliasType> = {
    filter: (attribute, value) => {
      dispatch({
        type: "filter",
        payload: { attribute, value },
      });
      return builder;
    },
    build: () => {
      const filters = state.filters.map((filter) => {
        return `filter[${filter.attribute}]=${filter.value.join(",")}`;
      });
      return `?${filters.join("&")}`;
    },
    clearFilters: () => {
      dispatch({
        type: "clear_filters",
        payload: undefined,
      });
      return builder;
    },
  };

  return builder;
};
