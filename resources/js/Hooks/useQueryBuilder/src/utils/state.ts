import { type Alias, type Filter } from "@/Hooks/useQueryBuilder/src/filter";

export interface GlobalState<Al> {
  aliases: Alias<Al>;
  filters: Filter[];
}
