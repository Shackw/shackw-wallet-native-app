import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

import { TokensService } from "@/application/services/TokensService";
import { TransferTokenCommand } from "@/domain/token";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

import type { Hex } from "viem";

export const useTransferToken = (
  options?: UseMutationOptions<Hex, Error, TransferTokenCommand, unknown>
): UseMutationResult<Hex, Error, TransferTokenCommand, unknown> => {
  const { currentChain } = useWalletPreferencesContext();
  const { quotesGateway, tokensGateway } = useDependenciesContainerContext();

  return useMutation<Hex, Error, TransferTokenCommand>({
    ...options,
    mutationKey: ["TransferToken"],
    mutationFn: command => TokensService.transferToken(currentChain, command, quotesGateway, tokensGateway)
  });
};
