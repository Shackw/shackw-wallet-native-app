import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { getTokenBalance } from "../api/tokenBalance";
import { TokenKind } from "../domain/tokens/registry";

export const useTokenBalance = (
  walletAddress: Address,
  token: TokenKind,
  options?: Partial<UseQueryOptions<string>>
): UseQueryResult<string> => {
  return useQuery({
    ...options,
    queryKey: [walletAddress, token],
    queryFn: () => getTokenBalance(walletAddress, token),
    retry: 1
  });
};
