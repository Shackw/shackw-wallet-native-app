import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { useUserSettingContext } from "@/providers/UserSettingProvider";
import { Token } from "@/registries/TokenRegistry";
import { TokensService } from "@/services/TokensService";

export const useTokenBalance = (
  wallet: Address,
  token: Token,
  options?: Partial<UseQueryOptions<string>>
): UseQueryResult<string> => {
  const { selectedChain } = useUserSettingContext();
  return useQuery({
    ...options,
    queryKey: [wallet, token],
    queryFn: () => TokensService.getTokenBalance(selectedChain, { wallet, token })
  });
};
