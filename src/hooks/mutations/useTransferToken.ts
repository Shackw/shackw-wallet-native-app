import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

import { TransferTokenCommand } from "@/models/token";
import { useUserSettingContext } from "@/providers/UserSettingProvider";
import { TokensService } from "@/services/TokensService";

import type { Hex } from "viem";

export const useTransferToken = (
  options?: UseMutationOptions<Hex, Error, TransferTokenCommand, unknown>
): UseMutationResult<Hex, Error, TransferTokenCommand, unknown> => {
  const { selectedChain } = useUserSettingContext();
  return useMutation<Hex, Error, TransferTokenCommand>({
    ...options,
    mutationKey: ["TransferToken"],
    mutationFn: command => TokensService.transferToken(selectedChain, command)
  });
};
