import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { FeesService } from "@/application/services/FeesService";
import { EstimateFeeCommand, FeeModel } from "@/domain/fee";
import { useUserSettingContext } from "@/presentation/providers/UserSettingProvider";

export const useTransferFee = (
  command: EstimateFeeCommand,
  options?: Partial<UseQueryOptions<FeeModel | null>>
): UseQueryResult<FeeModel | null> => {
  const { currentChain } = useUserSettingContext();
  return useQuery({
    ...options,
    queryKey: [currentChain, command.token, command.feeToken, command.amountDisplayValue],
    queryFn: () => FeesService.estimateFee(currentChain, command),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};
