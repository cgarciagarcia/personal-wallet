import { useQuery } from "@tanstack/react-query";

import { Typography } from "@/Components/Layout/Typography";
import { useApi } from "@/Hooks/Api/useApi";

export const Home = () => {
  const { getTransactions } = useApi();

  const { data, isLoading } = useQuery({
    queryFn: getTransactions,
    queryKey: ["getTransactions"],
  });

  return (
    <div className="bg-white">
      {!isLoading && data?.data && data?.data.data.length > 0 ? (
        data.data.data.map((transaction) => (
          <div key={transaction.id}>
            <Typography as="h1">{transaction.money.amount}</Typography>
          </div>
        ))
      ) : (
        <Typography as="h1">Loading...</Typography>
      )}
    </div>
  );
};
