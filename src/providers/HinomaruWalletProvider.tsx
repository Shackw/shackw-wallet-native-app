import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import * as v from "valibot";
import { Address, createWalletClient, Hex, http, WalletClient } from "viem";
import { Account, generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { SUPPORT_CHAINS } from "@/configs/chain";
import { CUSTOM_RPC_URLS } from "@/configs/rpcUrls";
import { useGetDefaultPrivateKey } from "@/hooks/mutations/useGetDefaultPrivateKey";
import { useStorePrivateKey } from "@/hooks/mutations/useStorePrivateKey";
import { useBoolean } from "@/hooks/useBoolean";
import { nameFormValidator } from "@/validations/forms/nameFormValidator";
import { hex64Validator } from "@/validations/rules/addressValidator";

import { useUserSettingContext } from "./UserSettingProvider";

type HinomaruWalletContextType = {
  account: Account | undefined;
  client: WalletClient | undefined;
  hasPrivateKey: boolean;
  createWallet: (name: string) => Promise<void>;
  restoreWallet: (name: string, pk: string) => Promise<void>;
};

export const HinomaruWalletContext = createContext<HinomaruWalletContextType | undefined>(undefined);

export const HinomaruWalletProvider = ({ children }: { children: ReactNode }) => {
  const [hasPrivateKey, setHasPrivateKey] = useBoolean(true);
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [client, setClient] = useState<WalletClient | undefined>(undefined);

  const { selectedChain } = useUserSettingContext();
  const { mutateAsync: storePrivateKey } = useStorePrivateKey();
  const { mutateAsync: getDefaultPrivateKey } = useGetDefaultPrivateKey();

  const connectWallet = useCallback(
    (pk: Hex): Address => {
      const account = privateKeyToAccount(pk);
      const client = createWalletClient({
        account,
        chain: SUPPORT_CHAINS[selectedChain],
        transport: http(CUSTOM_RPC_URLS[selectedChain])
      });

      setAccount(account);
      setClient(client);
      return account.address;
    },
    [selectedChain]
  );

  const getStoredPrivateKey = useCallback(async (): Promise<Hex | null> => {
    const storedPk = await getDefaultPrivateKey().catch(() => null);
    setHasPrivateKey.set(!!storedPk);
    return storedPk;
  }, [getDefaultPrivateKey, setHasPrivateKey]);

  const tryConnectWallet = useCallback(async () => {
    const storedPk = await getStoredPrivateKey();

    if (!storedPk) return;

    connectWallet(storedPk);
  }, [connectWallet, getStoredPrivateKey]);

  const createWallet = useCallback(
    async (name: string) => {
      const validatedName = v.safeParse(nameFormValidator, name);
      if (!validatedName.success) throw new Error(validatedName.issues[0].message);

      const privateKey = generatePrivateKey();
      const address = connectWallet(privateKey);

      await storePrivateKey({ name: validatedName.output, wallet: address, privateKey });

      setHasPrivateKey.on();
    },
    [connectWallet, storePrivateKey, setHasPrivateKey]
  );

  const restoreWallet = useCallback(
    async (name: string, pk: string) => {
      const validatedPk = v.safeParse(hex64Validator("PK"), pk);
      if (!validatedPk.success) throw new Error("不正なプライベートキーが入力されました。");

      const validatedName = v.safeParse(nameFormValidator, name);
      if (!validatedName.success) throw new Error(validatedName.issues[0].message);

      const address = connectWallet(validatedPk.output);
      await storePrivateKey({ name: validatedName.output, wallet: address, privateKey: validatedPk.output });

      setHasPrivateKey.on();
    },
    [connectWallet, storePrivateKey, setHasPrivateKey]
  );

  useEffect(() => {
    tryConnectWallet();
  }, [tryConnectWallet]);

  return (
    <HinomaruWalletContext.Provider
      value={{
        account,
        client,
        hasPrivateKey,
        createWallet,
        restoreWallet
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
