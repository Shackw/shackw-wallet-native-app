import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { TransactionsService } from "@/application/services/TransactionsService";
import { Chain } from "@/config/chain";
import { TransactionModel } from "@/domain/transaction";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useGetLastTransaction = (
  wallet: Address,
  currentChain: Chain,
  options?: Partial<UseQueryOptions<TransactionModel | null>>
): UseQueryResult<TransactionModel | null> => {
  const { transactionsGateway } = useDependenciesContainerContext();

  return useQuery({
    ...options,
    queryKey: [currentChain, wallet],
    queryFn: () => TransactionsService.getLastTransaction(currentChain, { wallet }, transactionsGateway),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
