import { useQuery } from "@tanstack/react-query";

import { TransactionsService } from "@/application/services/TransactionsService";
import type { Chain } from "@/config/chain";
import type { TransactionModel } from "@/domain/transaction";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Address } from "viem";

export const useGetLastTransaction = (
  wallet: Address,
  currentChain: Chain,
  options?: Partial<UseQueryOptions<TransactionModel | null>>
): UseQueryResult<TransactionModel | null> => {
  const { transactionsRepository } = useDependenciesContainerContext();

  return useQuery({
    ...options,
    queryKey: [currentChain, wallet],
    queryFn: () => TransactionsService.getLastTransaction(currentChain, { wallet }, transactionsRepository),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
