import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { ListTransactionsByTermCommand, TransactionModel } from "@/models/transaction";
import { TransactionsService } from "@/services/TransactionsService";

export const useListTransactionsByTerm = (
  command: ListTransactionsByTermCommand,
  options?: Partial<UseQueryOptions<TransactionModel[]>>
): UseQueryResult<TransactionModel[]> => {
  return useQuery({
    ...options,
    queryKey: [command.timeFrom, command.timeTo, command.token, command.wallet],
    queryFn: () => TransactionsService.listTransactionsByTerm(command)
  });
};
