import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { EstimateFeeCommand, FeeModel } from "@/models/fee";
import { FeesService } from "@/services/FeesService";

export const useTransferFee = (
  command: EstimateFeeCommand,
  options?: Partial<UseQueryOptions<FeeModel | null>>
): UseQueryResult<FeeModel | null> => {
  return useQuery({
    ...options,
    queryKey: [command.token, command.feeToken, command.amountDecimals],
    queryFn: () => FeesService.estimateFee(command)
  });
};
