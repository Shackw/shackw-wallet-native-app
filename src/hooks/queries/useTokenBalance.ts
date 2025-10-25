import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { Token } from "@/registries/TokenRegistry";
import { TokensService } from "@/services/TokensService";

export const useTokenBalance = (
  wallet: Address,
  token: Token,
  options?: Partial<UseQueryOptions<string>>
): UseQueryResult<string> => {
  return useQuery({
    ...options,
    queryKey: [wallet, token],
    queryFn: () => TokensService.getTokenBalance({ wallet, token })
  });
};
