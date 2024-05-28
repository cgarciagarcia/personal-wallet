import Skeleton from "react-loading-skeleton";

import { Typography } from "@/Components/Layout/Typography";

export const TransactionItemSkeleton = () => {
  return (
    <article className="min-h-auto w-full p-4 first:rounded-t-lg last:border-b-2 last:border-black hover:!bg-gray-300">
      <Typography as="span" weight="bold">
        <Skeleton height={21} />
      </Typography>
      <div className="flex items-center justify-between">
        <div>
          <Typography>
            <Skeleton width={100} />
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex h-4 flex-row justify-end gap-3">
            <Skeleton circle={true} width="1rem" />
            <Skeleton circle={true} width="1rem" />
          </div>
          <Typography weight="medium" className={"text-green-500"}>
            <Skeleton />
          </Typography>
        </div>
      </div>
    </article>
  );
};
