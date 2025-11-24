import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { TransactionsService } from "@/application/services/TransactionsService";
import { ListMonthlyTransactionsCommand, TransactionModel } from "@/domain/transaction";
import { HttpRemoteTransactionsGateway } from "@/infrastructure/http/HttpRemoteTransactionsGateway";
import { SqlLocalTransactionsRepository } from "@/infrastructure/sql/SqlLocalTransactionsRepository";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

export const useListMonthlyTransactions = (
  command: ListMonthlyTransactionsCommand,
  options?: Partial<UseQueryOptions<TransactionModel[]>>
): UseQueryResult<TransactionModel[]> => {
  const db = useSQLiteContext();
  const { currentChain } = useWalletPreferencesContext();

  return useQuery({
    ...options,
    queryKey: [currentChain, command.year, command.month, command.token, command.wallet],
    queryFn: () => {
      const remoteTransactionsGateway = new HttpRemoteTransactionsGateway();
      const localTransactionsRepository = new SqlLocalTransactionsRepository(db);
      return TransactionsService.listMonthlyTransactionsService(
        currentChain,
        command,
        remoteTransactionsGateway,
        localTransactionsRepository
      );
    },
    staleTime: Infinity,
    gcTime: Infinity
  });
};
