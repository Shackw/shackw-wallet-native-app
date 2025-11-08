import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

import { TokensService } from "@/application/services/TokensService";
import { TransferTokenCommand } from "@/domain/token";
import { useUserSettingContext } from "@/presentation/providers/UserSettingProvider";

import type { Hex } from "viem";

export const useTransferToken = (
  options?: UseMutationOptions<Hex, Error, TransferTokenCommand, unknown>
): UseMutationResult<Hex, Error, TransferTokenCommand, unknown> => {
  const { currentChain } = useUserSettingContext();
  return useMutation<Hex, Error, TransferTokenCommand>({
    ...options,
    mutationKey: ["TransferToken"],
    mutationFn: command => TokensService.transferToken(currentChain, command)
  });
};
