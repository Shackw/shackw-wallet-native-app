import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";

import { InitializeWalletUsecase } from "@/application/usecases/InitializeWalletUsecase";
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
      InitializeWalletUsecase.execute(addressesRepository, userSettingRepository, privateKeyRepository)
  });
};
