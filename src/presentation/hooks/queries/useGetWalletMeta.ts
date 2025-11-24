import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { WalletMetaService } from "@/application/services/WalletMetaService";
import { WalletMetaModel } from "@/domain/walletMeta";
import { HttpWalletMetaGateway } from "@/infrastructure/http/HttpWalletMetaGateway";

export const useGetWalletMeta = (
  options?: Partial<UseQueryOptions<WalletMetaModel>>
): UseQueryResult<WalletMetaModel> => {
  return useQuery({
    ...options,
    queryKey: ["GetWalletMeta"],
    queryFn: () => {
      const walletMetaRepository = new HttpWalletMetaGateway();
      return WalletMetaService.getSummary(walletMetaRepository);
    },
    staleTime: Infinity,
    gcTime: Infinity
  });
};
