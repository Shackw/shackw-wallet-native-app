import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { EstimateFeeCommand, FeeModel } from "@/models/fee";
import { useUserSettingContext } from "@/providers/UserSettingProvider";
import { FeesService } from "@/services/FeesService";

export const useTransferFee = (
  command: EstimateFeeCommand,
  options?: Partial<UseQueryOptions<FeeModel | null>>
): UseQueryResult<FeeModel | null> => {
  const { currentChain } = useUserSettingContext();
  return useQuery({
    ...options,
    queryKey: [currentChain, command.token, command.feeToken, command.amountDecimals],
    queryFn: () => FeesService.estimateFee(currentChain, command),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};
