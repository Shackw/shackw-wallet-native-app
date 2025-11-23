import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

import { TokensService } from "@/application/services/TokensService";
import { TransferTokenCommand } from "@/domain/token";
import { HttpQuotesGateway } from "@/infrastructure/http/HttpQuotesGateway";
import { HttpTokensGateway } from "@/infrastructure/http/HttpTokensGateway";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

import type { Hex } from "viem";

export const useTransferToken = (
  options?: UseMutationOptions<Hex, Error, TransferTokenCommand, unknown>
): UseMutationResult<Hex, Error, TransferTokenCommand, unknown> => {
  const { currentChain } = useWalletPreferencesContext();

  return useMutation<Hex, Error, TransferTokenCommand>({
    ...options,
    mutationKey: ["TransferToken"],
    mutationFn: command => {
      const quotesRepository = new HttpQuotesGateway();
      const tokenRepository = new HttpTokensGateway();
      return TokensService.transferToken(currentChain, command, quotesRepository, tokenRepository);
    }
  });
};
