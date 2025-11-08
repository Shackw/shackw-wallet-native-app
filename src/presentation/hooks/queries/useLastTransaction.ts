import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Address } from "viem";

import { TransactionsUsecase } from "@/application/usecase/TransactionsUsecase";
import { SupportChain } from "@/config/chain";
import { TransactionModel } from "@/domain/transaction";

export const useLastTransaction = (
  wallet: Address,
  currentChain: SupportChain,
  options?: Partial<UseQueryOptions<TransactionModel | null>>
): UseQueryResult<TransactionModel | null> => {
  const db = useSQLiteContext();
  return useQuery({
    ...options,
    queryKey: [currentChain, wallet],
    queryFn: () => TransactionsUsecase.getLastTransaction(db, currentChain, { wallet }),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
