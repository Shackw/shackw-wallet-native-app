import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { TokensService } from "@/application/services/TokensService";
import { Chain } from "@/config/chain";
import { Token } from "@/registries/TokenRegistry";

type UseTokenBalanceProps = {
  chain: Chain;
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
