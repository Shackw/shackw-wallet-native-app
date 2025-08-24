import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { Address } from "viem";

import { getLastTransaction } from "@/shared/api/transaction";

import { Erc20Transfer } from "../types/erc20";

export const useLastTransaction = (
  walletAddress: Address,
  options?: Partial<UseQueryOptions<Erc20Transfer | null>>
): UseQueryResult<Erc20Transfer | null> => {
  return useQuery({
    ...options,
    queryKey: [walletAddress],
    queryFn: () => getLastTransaction(walletAddress),
    retry: 0
  });
};
