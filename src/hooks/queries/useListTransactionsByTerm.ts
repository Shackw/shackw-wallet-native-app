import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { ListTransactionsByTermCommand, TransactionModel } from "@/models/transaction";
import { useUserSettingContext } from "@/providers/UserSettingProvider";
import { TransactionsService } from "@/services/TransactionsService";

export const useListTransactionsByTerm = (
  command: ListTransactionsByTermCommand,
  options?: Partial<UseQueryOptions<TransactionModel[]>>
): UseQueryResult<TransactionModel[]> => {
  const db = useSQLiteContext();
  const { selectedChain } = useUserSettingContext();
  return useQuery({
    ...options,
    queryKey: [command.timeTo, command.token, command.wallet],
    queryFn: () => TransactionsService.listTransactionsByTerm(db, selectedChain, command)
  });
};
