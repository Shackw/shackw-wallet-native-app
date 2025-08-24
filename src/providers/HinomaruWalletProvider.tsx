import { UseQueryResult } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { createWalletClient, Hex, http, WalletClient } from "viem";
import { Account, generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { DEFAULT_CHAIN } from "@/shared/config/chains";
import { WALLET_PRIVATE_KEY_BASE_NAME } from "@/shared/config/viem";
import { useBoolean } from "@/shared/hooks/useBoolean";
import { useLastTransaction } from "@/shared/queries/useLastTransaction";
import { Erc20Transfer } from "@/shared/types/erc20";

type HinomaruWalletContextType = {
  eoaAccount: Account | undefined;
  isStoredPrivateKey: boolean;
  walletClient: WalletClient | undefined;
  lastTransactionResult: UseQueryResult<Erc20Transfer | null | undefined>;
  createHinomaruWallet: () => Promise<void>;
};

export const HinomaruWalletContext = createContext<HinomaruWalletContextType | undefined>(undefined);

export const HinomaruWalletProvider = ({ children }: { children: ReactNode }) => {
  const [eoaAccount, setEoaAccount] = useState<Account | undefined>(undefined);
  const [isStoredPrivateKey, setIsStoredPrivateKey] = useBoolean(true);
  const [walletClient, setWalletClient] = useState<WalletClient | undefined>(undefined);

  const lastTransactionResult = useLastTransaction(eoaAccount?.address ?? "0x", {
    enabled: !!eoaAccount?.address
  });

  const connectWallet = useCallback((pk: Hex) => {
    const account = privateKeyToAccount(pk);
    const client = createWalletClient({
      account,
      chain: DEFAULT_CHAIN,
      transport: http()
    });

    setEoaAccount(account);
    setWalletClient(client);
  }, []);

  const getStoredPrivateKey = useCallback(async (): Promise<Hex | null> => {
    const storedPk = await SecureStore.getItemAsync(WALLET_PRIVATE_KEY_BASE_NAME);
    setIsStoredPrivateKey.set(!!storedPk);
    return storedPk ? (storedPk as Hex) : null;
  }, [setIsStoredPrivateKey]);

  const tryConnectWallet = useCallback(async () => {
    const storedPk = await getStoredPrivateKey();

    if (!storedPk) return;

    connectWallet(storedPk);
  }, [connectWallet, getStoredPrivateKey]);

  const createHinomaruWallet = useCallback(async () => {
    const storedPk = await getStoredPrivateKey();
    if (storedPk) return;

    const privateKey = generatePrivateKey();
    connectWallet(privateKey);

    await SecureStore.setItemAsync(WALLET_PRIVATE_KEY_BASE_NAME, privateKey);
    setIsStoredPrivateKey.on();
  }, [connectWallet, getStoredPrivateKey, setIsStoredPrivateKey]);

  useEffect(() => {
    tryConnectWallet();
  }, [tryConnectWallet]);

  return (
    <HinomaruWalletContext.Provider
      value={{
        eoaAccount,
        isStoredPrivateKey,
        walletClient,
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
