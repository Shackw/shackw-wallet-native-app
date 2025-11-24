import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { TransactionsService } from "@/application/services/TransactionsService";
import { Chain } from "@/config/chain";
import { TransactionModel } from "@/domain/transaction";
import { HttpRemoteTransactionsGateway } from "@/infrastructure/http/HttpRemoteTransactionsGateway";

export const useGetLastTransaction = (
  wallet: Address,
  currentChain: Chain,
  options?: Partial<UseQueryOptions<TransactionModel | null>>
): UseQueryResult<TransactionModel | null> => {
  return useQuery({
    ...options,
    queryKey: [currentChain, wallet],
    queryFn: () => {
      const remoteTransactionsGateway = new HttpRemoteTransactionsGateway();
      return TransactionsService.getLastTransaction(currentChain, { wallet }, remoteTransactionsGateway);
    },
    staleTime: Infinity,
    gcTime: Infinity
  });
};
