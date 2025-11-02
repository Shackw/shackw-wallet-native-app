import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Address } from "viem";

import { SupportChain } from "@/configs/chain";
import { TransactionModel } from "@/models/transaction";
import { TransactionsService } from "@/services/TransactionsService";

export const useLastTransaction = (
  wallet: Address,
  currentChain: SupportChain,
  options?: Partial<UseQueryOptions<TransactionModel | null>>
): UseQueryResult<TransactionModel | null> => {
  const db = useSQLiteContext();
  return useQuery({
    ...options,
    queryKey: [currentChain, wallet],
    queryFn: () => TransactionsService.getLastTransaction(db, currentChain, { wallet }),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
