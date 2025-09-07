import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { EstimateFeeCommand, FeeModel } from "@/models/fee";
import { FeesService } from "@/services/FeesService";

export const useTransferFee = (
  cmd: EstimateFeeCommand,
  options?: Partial<UseQueryOptions<FeeModel | null>>
): UseQueryResult<FeeModel | null> => {
  return useQuery({
    ...options,
    queryKey: [cmd.token, cmd.feeToken, cmd.amountDecimals],
    queryFn: () => FeesService.estimateFee(cmd)
  });
};
