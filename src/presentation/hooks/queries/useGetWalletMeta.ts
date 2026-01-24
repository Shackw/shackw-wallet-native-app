import { useQuery } from "@tanstack/react-query";

import { WalletMetaService } from "@/application/services/WalletMetaService";
import type { ShackwApiMetaModel } from "@/domain/shackwApiMeta";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetWalletMeta = (
  options?: Partial<UseQueryOptions<ShackwApiMetaModel>>
): UseQueryResult<ShackwApiMetaModel> => {
  const { walletMetaGateway } = useDependenciesContainerContext();

  return useQuery({
    ...options,
    queryKey: ["GetWalletMeta"],
    queryFn: () => WalletMetaService.getSummary(walletMetaGateway),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
