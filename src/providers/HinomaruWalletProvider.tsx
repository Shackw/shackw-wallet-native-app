import { UseQueryResult } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { createWalletClient, Hex, http, WalletClient } from "viem";
import { Account, generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { DEFAULT_CHAIN } from "@/configs/chain";
import { WALLET_PRIVATE_KEY_BASE_NAME } from "@/configs/viem";
import { useLastTransaction } from "@/hooks/queries/useLastTransaction";
import { useBoolean } from "@/hooks/useBoolean";
import { TransactionModel } from "@/models/transaction";

type HinomaruWalletContextType = {
  account: Account | undefined;
  client: WalletClient | undefined;
  hasPrivateKey: boolean;
  lastTransactionResult: UseQueryResult<TransactionModel | null | undefined>;
  createHinomaruWallet: () => Promise<void>;
};

export const HinomaruWalletContext = createContext<HinomaruWalletContextType | undefined>(undefined);

export const HinomaruWalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [client, setClient] = useState<WalletClient | undefined>(undefined);
  const [hasPrivateKey, setHasPrivateKey] = useBoolean(true);

  const lastTransactionResult = useLastTransaction(account?.address ?? "0x", {
    retry: 0,
    enabled: !!account?.address
  });

  const connectWallet = useCallback((pk: Hex) => {
    const account = privateKeyToAccount(pk);
    const client = createWalletClient({
      account,
      chain: DEFAULT_CHAIN,
      transport: http()
    });

    setAccount(account);
    setClient(client);
  }, []);

  const getStoredPrivateKey = useCallback(async (): Promise<Hex | null> => {
    const storedPk = await SecureStore.getItemAsync(WALLET_PRIVATE_KEY_BASE_NAME);
    setHasPrivateKey.set(!!storedPk);
    return storedPk ? (storedPk as Hex) : null;
  }, [setHasPrivateKey]);

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
    setHasPrivateKey.on();
  }, [connectWallet, getStoredPrivateKey, setHasPrivateKey]);

  useEffect(() => {
    tryConnectWallet();
  }, [tryConnectWallet]);

  return (
    <HinomaruWalletContext.Provider
      value={{
        account,
        client,
        hasPrivateKey,
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
