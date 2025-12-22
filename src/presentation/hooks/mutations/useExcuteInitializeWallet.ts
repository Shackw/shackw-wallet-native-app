import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";

import { InitializeWalletUseCase } from "@/application/useCase/InitializeWalletUseCase";
import { PrivateKeyModel } from "@/domain/privateKey";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useExcuteInitializeWallet = (
  options?: UseMutationOptions<PrivateKeyModel | null, Error, void>
): UseMutationResult<PrivateKeyModel | null, Error, void> => {
  const { addressesRepository, userSettingRepository, privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<PrivateKeyModel | null, Error, void>({
    ...options,
    mutationKey: ["ExcuteInitializeWallet"],
    mutationFn: async () =>
      InitializeWalletUseCase.execute(addressesRepository, userSettingRepository, privateKeyRepository)
  });
};
