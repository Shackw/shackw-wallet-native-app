import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { Hex } from "viem";

import { InitializeWalletUseCase } from "@/application/useCase/InitializeWalletUseCase";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useExcuteInitializeWallet = (
  options?: UseMutationOptions<Hex | null, Error, void>
): UseMutationResult<Hex | null, Error, void> => {
  const { addressesRepository, userSettingRepository, privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<Hex | null, Error, void>({
    ...options,
    mutationKey: ["ExcuteInitializeWallet"],
    mutationFn: async () =>
      InitializeWalletUseCase.execute(addressesRepository, userSettingRepository, privateKeyRepository)
  });
};
