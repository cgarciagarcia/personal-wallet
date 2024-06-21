import { memo } from "react";
import Skeleton from "react-loading-skeleton";

import { Text } from "@/Components/Layout";

export const TransactionItemSkeleton = memo(function MemoSkeleton() {
  return (
    <article className="min-h-auto w-full p-4 first:rounded-t-lg last:border-b-2 last:border-black hover:!bg-gray-300">
      <Text as="span" weight="bold">
        <Skeleton height={21} />
      </Text>
      <div className="flex items-center justify-between">
        <div>
          <Text>
            <Skeleton width={100} />
          </Text>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex h-4 flex-row justify-end gap-3">
            <Skeleton circle={true} width="1rem" />
            <Skeleton circle={true} width="1rem" />
          </div>
          <Text weight="medium" className={"text-green-500"}>
            <Skeleton />
          </Text>
        </div>
      </div>
    </article>
  );
});
