import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";

import { Chain } from "@/config/chain";
import { useUpdateDefaultChain } from "@/presentation/hooks/mutations/useUpdateSelectedChain";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

const useSelectNetworkFormProvider = () => {
  const router = useRouter();
  const { mutateAsync: updateDefaultChain } = useUpdateDefaultChain();
  const { currentChain, defaultChain, setCurrentChain, refetchUserSetting } = useWalletPreferencesContext();

  const [inputChain, setInputChain] = useState<Chain>(currentChain);
  const [isChangeDefault, setIsChangeDefault] = useBoolean(false);

  const [isError, setIsError] = useBoolean(false);
  const [isPending, setIsPending] = useBoolean(false);

  const handleConfirm = useCallback(async () => {
    setIsError.off();
    setIsPending.on();

    if (isChangeDefault) {
      await updateDefaultChain({ defaultChain: inputChain }).catch(setIsError.on);
      await refetchUserSetting();
    } else {
      setCurrentChain(inputChain);
    }

    setIsPending.off();
    router.back();
  }, [
    router,
    inputChain,
    isChangeDefault,
    setIsError,
    setIsPending,
    setCurrentChain,
    refetchUserSetting,
    updateDefaultChain
  ]);

  return {
    form: {
      inputChain,
      isChangeDefault,
      setInputChain,
      setIsChangeDefault
    },
    fieldMeta: {
      isError,
      isPending,
      isValid: currentChain !== inputChain || (inputChain !== defaultChain && isChangeDefault),
      isSwitchDisabled: inputChain === defaultChain
    },
    handleConfirm
  };
};

type SelectNetworkFormContextType = ReturnType<typeof useSelectNetworkFormProvider>;
const SelectNetworkFormContext = createContext<SelectNetworkFormContextType | undefined>(undefined);

export const SelectNetworkFormProvider = ({ children }: PropsWithChildren) => {
  const { form, fieldMeta, handleConfirm } = useSelectNetworkFormProvider();

  return (
    <SelectNetworkFormContext.Provider value={{ form, fieldMeta, handleConfirm }}>
      {children}
    </SelectNetworkFormContext.Provider>
  );
};

const useSelectNetworkForm = () => {
  const ctx = useContext(SelectNetworkFormContext);
  if (!ctx)
    throw new Error("SelectNetworkFormProvider is not mounted. Wrap your component with <SelectNetworkFormProvider>.");
  return ctx;
};

export default useSelectNetworkForm;
