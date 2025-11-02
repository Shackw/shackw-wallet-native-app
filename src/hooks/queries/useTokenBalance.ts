import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { SupportChain } from "@/configs/chain";
import { Token } from "@/registries/TokenRegistry";
import { TokensService } from "@/services/TokensService";

type UseTokenBalanceProps = {
  chain: SupportChain;
  wallet: Address;
  token: Token;
};

export const useTokenBalance = (
  props: UseTokenBalanceProps,
  options?: Partial<UseQueryOptions<string>>
): UseQueryResult<string> => {
  return useQuery({
    ...options,
    queryKey: [Object.values(props)],
    queryFn: () => TokensService.getTokenBalance(props)
  });
};
