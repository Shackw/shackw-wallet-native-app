import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import * as v from "valibot";
import { Address, createWalletClient, Hex, http, WalletClient } from "viem";
import { Account, generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { SUPPORT_CHAINS } from "@/config/chain";
import { CUSTOM_RPC_URLS } from "@/config/rpcUrls";
import { useGetDefaultPrivateKey } from "@/presentation/hooks/mutations/useGetDefaultPrivateKey";
import { useGetPrivateKeyByWallet } from "@/presentation/hooks/mutations/useGetPrivateKeyByWallet";
import { useStorePrivateKey } from "@/presentation/hooks/mutations/useStorePrivateKey";
import { useUpdateDefaultWallet } from "@/presentation/hooks/mutations/useUpdateDefaultWallet";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { nameFormValidator } from "@/shared/validations/forms/nameFormValidator";
import { hex64Validator } from "@/shared/validations/rules/addressValidator";

import { useUserSettingContext } from "./UserSettingProvider";

type ShackwWalletContextType = {
  account: Account | undefined;
  client: WalletClient | undefined;
  hasPrivateKey: boolean;
  createWallet: (name: string) => Promise<void>;
  restoreWallet: (name: string, pk: string) => Promise<void>;
  changeWallet: (wallet: Address, isChangeDefault: boolean) => Promise<void>;
};

export const ShackwWalletContext = createContext<ShackwWalletContextType | undefined>(undefined);

export const ShackwWalletProvider = ({ children }: PropsWithChildren) => {
  const [hasPrivateKey, setHasPrivateKey] = useBoolean(true);
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [client, setClient] = useState<WalletClient | undefined>(undefined);

  const { currentChain } = useUserSettingContext();
  const { mutateAsync: storePrivateKey } = useStorePrivateKey({ retry: 0 });
  const { mutateAsync: getDefaultPrivateKey } = useGetDefaultPrivateKey({ retry: 0 });
  const { mutateAsync: getPrivateKeyByWallet } = useGetPrivateKeyByWallet({ retry: 0 });
  const { mutateAsync: updateDefaultWallet } = useUpdateDefaultWallet({ retry: 0 });

  const connectWallet = useCallback(
    (pk: Hex): Address => {
      const account = privateKeyToAccount(pk);
      const client = createWalletClient({
        account,
        chain: SUPPORT_CHAINS[currentChain],
        transport: http(CUSTOM_RPC_URLS[currentChain])
      });

      setAccount({ ...account, address: account.address.toLowerCase() as Address });
      setClient(client);
      return account.address;
    },
    [currentChain]
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

  const changeWallet = useCallback(
    async (wallet: Address, isChangeDefault: boolean) => {
      const privateKey = await getPrivateKeyByWallet(wallet);
      connectWallet(privateKey);

      if (isChangeDefault) await updateDefaultWallet({ defaultWallet: wallet });
    },
    [connectWallet, getPrivateKeyByWallet, updateDefaultWallet]
  );

  useEffect(() => {
    tryConnectWallet();
  }, [tryConnectWallet]);

  return (
    <ShackwWalletContext.Provider
      value={{
        account,
        client,
        hasPrivateKey,
        createWallet,
        restoreWallet,
        changeWallet
      }}
    >
      {children}
    </ShackwWalletContext.Provider>
  );
};

export const useShackwWalletContext = () => {
  const ctx = useContext(ShackwWalletContext);
  if (!ctx) throw new Error("ShackwWalletProvider is not mounted. Wrap your component with <ShackwWalletProvider>.");
  return ctx;
};
