import { useQuery } from "@tanstack/react-query";

import { TokensService } from "@/application/services/TokensService";
import type { Chain } from "@/config/chain";
import type { Token } from "@/registries/ChainTokenRegistry";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Address } from "viem";

type UseGetTokenBalanceProps = {
  chain: Chain;
  wallet: Address;
  token: Token;
};

export const useGetTokenBalance = (
  props: UseGetTokenBalanceProps,
  options?: Partial<UseQueryOptions<string>>
): UseQueryResult<string> => {
  return useQuery({
    ...options,
    queryKey: [Object.values(props)],
    queryFn: () => TokensService.getTokenBalance(props)
  });
};
