import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { TransactionModel } from "@/models/transaction";
import { TransactionService } from "@/services/TransactionService";

export const useLastTransaction = (
  wallet: Address,
  options?: Partial<UseQueryOptions<TransactionModel | null>>
): UseQueryResult<TransactionModel | null> => {
  return useQuery({ ...options, queryKey: [wallet], queryFn: () => TransactionService.getLastTransaction({ wallet }) });
};
