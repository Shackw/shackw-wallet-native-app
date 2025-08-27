import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { TokenKind } from "@/configs/token";
import { TokenService } from "@/services/TokenService";

export const useTokenBalance = (
  wallet: Address,
  token: TokenKind,
  options?: Partial<UseQueryOptions<string>>
): UseQueryResult<string> => {
  return useQuery({
    ...options,
    queryKey: [wallet, token],
    queryFn: () => TokenService.getTokenBalance({ wallet, token })
  });
};
