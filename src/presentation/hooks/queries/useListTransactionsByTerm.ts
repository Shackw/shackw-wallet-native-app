import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { TransactionsUsecase } from "@/application/usecase/TransactionsUsecase";
import { ListTransactionsByTermCommand, TransactionModel } from "@/domain/transaction";
import { useUserSettingContext } from "@/presentation/providers/UserSettingProvider";

export const useListTransactionsByTerm = (
  command: ListTransactionsByTermCommand,
  options?: Partial<UseQueryOptions<TransactionModel[]>>
): UseQueryResult<TransactionModel[]> => {
  const db = useSQLiteContext();
  const { currentChain } = useUserSettingContext();
  return useQuery({
    ...options,
    queryKey: [currentChain, command.timeFrom.toString(), command.token, command.wallet],
    queryFn: () => TransactionsUsecase.listTransactionsByTerm(db, currentChain, command),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
