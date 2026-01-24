import { useQuery } from "@tanstack/react-query";

import { TransactionsService } from "@/application/services/TransactionsService";
import type { ListMonthlyTransactionsCommand, TransactionModel } from "@/domain/transaction";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useListMonthlyTransactions = (
  command: ListMonthlyTransactionsCommand,
  options?: Partial<UseQueryOptions<TransactionModel[]>>
): UseQueryResult<TransactionModel[]> => {
  const { currentChain } = useWalletPreferencesContext();
  const { transactionsGateway, transactionsRepository } = useDependenciesContainerContext();

  return useQuery({
    ...options,
    queryKey: [currentChain, command.year, command.month, command.token, command.wallet],
    queryFn: () =>
      TransactionsService.listMonthlyTransactionsService(
        currentChain,
        command,
        transactionsGateway,
        transactionsRepository
      ),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
