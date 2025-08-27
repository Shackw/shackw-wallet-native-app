import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

import { TransferTokenCommand } from "@/models/token";
import { TokenService } from "@/services/TokenService";

import type { Hex } from "viem";

export const useTransferToken = (
  options?: UseMutationOptions<Hex, Error, TransferTokenCommand, unknown>
): UseMutationResult<Hex, Error, TransferTokenCommand, unknown> => {
  return useMutation<Hex, Error, TransferTokenCommand>({
    ...options,
    mutationKey: ["transferToken"],
    mutationFn: cmd => TokenService.transferToken(cmd)
  });
};
