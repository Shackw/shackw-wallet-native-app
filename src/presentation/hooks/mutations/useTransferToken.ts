import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

import { TokensService } from "@/application/services/TokensService";
import { TransferTokenCommand } from "@/domain/token";
import { HttpQuotesRepository } from "@/infrastructure/http/HttpQuotesRepository";
import { HttpTokensRepository } from "@/infrastructure/http/HttpTokensRepository";
import { useUserSettingContext } from "@/presentation/providers/UserSettingProvider";

import type { Hex } from "viem";

export const useTransferToken = (
  options?: UseMutationOptions<Hex, Error, TransferTokenCommand, unknown>
): UseMutationResult<Hex, Error, TransferTokenCommand, unknown> => {
  const { currentChain } = useUserSettingContext();

  return useMutation<Hex, Error, TransferTokenCommand>({
    ...options,
    mutationKey: ["TransferToken"],
    mutationFn: command => {
      const quotesRepository = new HttpQuotesRepository();
      const tokenRepository = new HttpTokensRepository();
      return TokensService.transferToken(currentChain, command, quotesRepository, tokenRepository);
    }
  });
};
