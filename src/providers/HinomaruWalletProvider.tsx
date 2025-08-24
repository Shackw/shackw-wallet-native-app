import { UseQueryResult } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Hex } from "viem";
import { Account, generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { WALLET_PRIVATE_KEY_BASE_NAME } from "@/shared/config/viem";
import { useBoolean } from "@/shared/hooks/useBoolean";
import { useLastTransaction } from "@/shared/queries/useLastTransaction";
import { Erc20Transfer } from "@/shared/types/erc20";

type HinomaruWalletContextType = {
  eoaAccount: Account | undefined;
  isStoredPrivateKey: boolean;
  lastTransactionResult: UseQueryResult<Erc20Transfer | null | undefined>;
  createHinomaruWallet: () => Promise<void>;
};

export const HinomaruWalletContext = createContext<HinomaruWalletContextType | undefined>(undefined);

export const HinomaruWalletProvider = ({ children }: { children: ReactNode }) => {
  const [isStoredPrivateKey, setIsStoredPrivateKey] = useBoolean(true);
  const [eoaAccount, setEoaAccount] = useState<Account | undefined>(undefined);

  const lastTransactionResult = useLastTransaction(eoaAccount?.address ?? "0x", {
    enabled: !!eoaAccount?.address
  });

  const getStoredPrivateKey = useCallback(async (): Promise<Hex | null> => {
    const storedPk = await SecureStore.getItemAsync(WALLET_PRIVATE_KEY_BASE_NAME);
    setIsStoredPrivateKey.set(!!storedPk);
    return storedPk ? (storedPk as Hex) : null;
  }, [setIsStoredPrivateKey]);

  const tryConnectWallet = useCallback(async () => {
    const storedPk = await getStoredPrivateKey();

    if (!storedPk) return;

    const eoa = privateKeyToAccount(storedPk);
    setEoaAccount(eoa);
  }, [getStoredPrivateKey]);

  const createHinomaruWallet = useCallback(async () => {
    try {
      const storedPk = await getStoredPrivateKey();
      if (storedPk) return;

      const privateKey = generatePrivateKey();
      const account = privateKeyToAccount(privateKey);
      setEoaAccount(account);

      await SecureStore.setItemAsync(WALLET_PRIVATE_KEY_BASE_NAME, privateKey);
      setIsStoredPrivateKey.on();
    } catch (error) {
      console.log(error);
    }
  }, [getStoredPrivateKey, setIsStoredPrivateKey]);

  useEffect(() => {
    tryConnectWallet();
  }, [tryConnectWallet]);

  return (
    <HinomaruWalletContext.Provider
      value={{
        eoaAccount,
        isStoredPrivateKey,
        lastTransactionResult,
        createHinomaruWallet
      }}
    >
      {children}
    </HinomaruWalletContext.Provider>
  );
};

export const useHinomaruWalletContext = () => {
  const ctx = useContext(HinomaruWalletContext);
  if (!ctx)
    throw new Error("HinomaruWalletProvider is not mounted. Wrap your component with <HinomaruWalletProvider>.");
  return ctx;
};
