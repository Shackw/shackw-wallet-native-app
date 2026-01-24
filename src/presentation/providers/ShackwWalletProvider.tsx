import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import * as v from "valibot";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { CHAINS } from "@/config/chain";
import { CUSTOM_RPC_URL } from "@/config/rpcUrls";
import { useFetchPrivateKeyByWallet } from "@/presentation/hooks/mutations/useFetchPrivateKeyByWallet";
import { useStorePrivateKey } from "@/presentation/hooks/mutations/useStorePrivateKey";
import { useUpdateDefaultWallet } from "@/presentation/hooks/mutations/useUpdateDefaultWallet";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { nameFormValidator } from "@/shared/validations/forms/nameFormValidator";
import { hex64Validator } from "@/shared/validations/rules/addressValidator";

import { useExcuteInitializeWallet } from "../hooks/mutations/useExcuteInitializeWallet";

import { useWalletPreferencesContext } from "./WalletPreferencesProvider";

import type { PropsWithChildren } from "react";
import type { Address, Hex, WalletClient } from "viem";
import type { Account } from "viem/accounts";

type ShackwWalletContextType = {
  account: Account | undefined;
  walletClient: WalletClient | undefined;
  hasPrivateKey: boolean;
  walletEnabled: boolean;
  createWallet: (name: string) => Promise<void>;
  restoreWallet: (name: string, pk: string) => Promise<void>;
  changeWallet: (wallet: Address, isChangeDefault: boolean) => Promise<void>;
  enableWallet: () => void;
};

export const ShackwWalletContext = createContext<ShackwWalletContextType | undefined>(undefined);

export const ShackwWalletProvider = ({ children }: PropsWithChildren) => {
  const initializedRef = useRef(false);
  const [hasPrivateKey, setHasPrivateKey] = useBoolean(true);
  const [walletEnabled, setWalletEnabled] = useBoolean(false);
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [walletClient, setWalletClient] = useState<WalletClient | undefined>(undefined);

  const { currentChain, refetchUserSetting } = useWalletPreferencesContext();
  const { mutateAsync: storePrivateKey } = useStorePrivateKey({ retry: 0 });
  const { mutateAsync: updateDefaultWallet } = useUpdateDefaultWallet({ retry: 0 });
  const { mutateAsync: getPrivateKeyByWallet } = useFetchPrivateKeyByWallet({ retry: 0 });
  const { mutateAsync: excuteInitializeWallet } = useExcuteInitializeWallet({ retry: 0 });

  // === Private Function ===
  const connectWallet = useCallback(
    (pk: Hex) => {
      const account = privateKeyToAccount(pk);
      const client = createWalletClient({
        account,
        chain: CHAINS[currentChain],
        transport: http(CUSTOM_RPC_URL[currentChain])
      });

      setWalletClient(client);
      setAccount({ ...account, address: account.address.toLowerCase() as Address });

      refetchUserSetting();
    },
    [currentChain, refetchUserSetting]
  );

  // === Initialize Function ===
  const initializeWallet = useCallback(async () => {
    const defaultPk = await excuteInitializeWallet().catch(() => null);
    setHasPrivateKey.set(!!defaultPk);
    setWalletEnabled.set(!!defaultPk?.enabled);

    if (!defaultPk) return;

    connectWallet(defaultPk.privateKey);
  }, [excuteInitializeWallet, setHasPrivateKey, setWalletEnabled, connectWallet]);

  // === Public Function ===
  const createWallet = useCallback(
    async (name: string) => {
      const validatedName = v.safeParse(nameFormValidator, name);
      if (!validatedName.success) throw new Error(validatedName.issues[0].message);

      const privateKey = generatePrivateKey();
      const { address } = privateKeyToAccount(privateKey);
      await storePrivateKey({ name: validatedName.output, wallet: address, privateKey, enabled: false });

      setWalletEnabled.off();
      connectWallet(privateKey);

      setHasPrivateKey.on();
    },
    [connectWallet, setHasPrivateKey, setWalletEnabled, storePrivateKey]
  );

  const restoreWallet = useCallback(
    async (name: string, pk: string) => {
      const validatedPk = v.safeParse(hex64Validator("PK"), pk);
      if (!validatedPk.success) throw new Error("不正なプライベートキーが入力されました。");

      const validatedName = v.safeParse(nameFormValidator, name);
      if (!validatedName.success) throw new Error(validatedName.issues[0].message);

      const { address } = privateKeyToAccount(validatedPk.output);
      await storePrivateKey({
        name: validatedName.output,
        wallet: address,
        privateKey: validatedPk.output,
        enabled: true
      });

      setWalletEnabled.on();
      connectWallet(validatedPk.output);

      setHasPrivateKey.on();
    },
    [connectWallet, setHasPrivateKey, setWalletEnabled, storePrivateKey]
  );

  const changeWallet = useCallback(
    async (wallet: Address, isChangeDefault: boolean) => {
      const pk = await getPrivateKeyByWallet({ wallet, isAuthRequired: false });

      setWalletEnabled.set(pk.enabled);
      connectWallet(pk.privateKey);

      if (isChangeDefault) await updateDefaultWallet({ defaultWallet: wallet });
    },
    [connectWallet, getPrivateKeyByWallet, setWalletEnabled, updateDefaultWallet]
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    initializeWallet();
  }, [initializeWallet]);

  return (
    <ShackwWalletContext.Provider
      value={{
        account,
        walletClient,
        hasPrivateKey,
        walletEnabled,
        createWallet,
        restoreWallet,
        changeWallet,
        enableWallet: setWalletEnabled.on
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
