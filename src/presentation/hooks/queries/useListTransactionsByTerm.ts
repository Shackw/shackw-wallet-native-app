import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { TransactionsUsecase } from "@/application/usecase/TransactionsUsecase";
import { ListTransactionsByTermCommand, TransactionModel } from "@/domain/transaction";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

export const useListTransactionsByTerm = (
  command: ListTransactionsByTermCommand,
  options?: Partial<UseQueryOptions<TransactionModel[]>>
): UseQueryResult<TransactionModel[]> => {
  const db = useSQLiteContext();
  const { currentChain } = useWalletPreferencesContext();
  return useQuery({
    ...options,
    queryKey: [currentChain, command.timeFrom.toString(), command.token, command.wallet],
    queryFn: () => TransactionsUsecase.listTransactionsByTerm(db, currentChain, command),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
