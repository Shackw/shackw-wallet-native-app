import { useRouter } from "expo-router";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { Address } from "viem";

import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

import { AddressOption } from "./useMyAddressOptions";

const useSelectWalletFormProvider = (initialValue: AddressOption) => {
  const router = useRouter();
  const { changeWallet } = useShackwWalletContext();
  const { defaultWallet, refetchUserSetting: refetch } = useWalletPreferencesContext();

  const [inputWallet, setInputWallet] = useState<Address>(initialValue.value);
  const [isChangeDefault, setIsChangeDefault] = useBoolean(false);

  const [isError, setIsError] = useBoolean(false);
  const [isPending, setIsPending] = useBoolean(false);

  const handleConfirm = useCallback(async () => {
    setIsError.off();
    setIsPending.on();

    await changeWallet(inputWallet, isChangeDefault).catch(setIsError.on);
    await refetch();

    setIsPending.off();
    router.dismissTo("/");
  }, [changeWallet, inputWallet, isChangeDefault, refetch, router, setIsError, setIsPending]);

  return {
    form: {
      inputWallet,
      isChangeDefault,
      setInputWallet,
      setIsChangeDefault
    },
    fieldMeta: {
      isError,
      isPending,
      isValid: initialValue.value !== inputWallet || (inputWallet !== defaultWallet && isChangeDefault),
      isSwitchDisabled: inputWallet === defaultWallet
    },
    handleConfirm
  };
};

type SelectWalletFormContextType = ReturnType<typeof useSelectWalletFormProvider>;

const SelectWalletFormContext = createContext<SelectWalletFormContextType | undefined>(undefined);

type SelectWalletFormProviderProps = { initialValue: AddressOption; children: ReactNode };
export const SelectWalletFormProvider = (props: SelectWalletFormProviderProps) => {
  const { initialValue, children } = props;
  const { form, fieldMeta, handleConfirm } = useSelectWalletFormProvider(initialValue);

  return (
    <SelectWalletFormContext.Provider value={{ form, fieldMeta, handleConfirm }}>
      {children}
    </SelectWalletFormContext.Provider>
  );
};

const useSelectWalletForm = () => {
  const ctx = useContext(SelectWalletFormContext);
  if (!ctx)
    throw new Error("SelectWalletFormProvider is not mounted. Wrap your component with <SelectWalletFormProvider>.");
  return ctx;
};

export default useSelectWalletForm;
