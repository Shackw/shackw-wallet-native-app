import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { WalletMetaService } from "@/application/services/WalletMetaService";
import { ShackwApiMetaModel } from "@/domain/shackwApiMeta";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

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
