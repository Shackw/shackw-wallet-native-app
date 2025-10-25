import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Address } from "viem";

import { TransactionModel } from "@/models/transaction";
import { TransactionsService } from "@/services/TransactionsService";

export const useLastTransaction = (
  wallet: Address,
  options?: Partial<UseQueryOptions<TransactionModel | null>>
): UseQueryResult<TransactionModel | null> => {
  const db = useSQLiteContext();
  return useQuery({
    ...options,
    queryKey: [wallet],
    queryFn: () => TransactionsService.getLastTransaction(db, { wallet })
  });
};
