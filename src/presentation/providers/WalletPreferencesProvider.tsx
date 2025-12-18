import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Address } from "viem";

import { Chain } from "@/config/chain";
import { useGetUserSetting } from "@/presentation/hooks/queries/useGetUserSetting";
import { SUPPORT_CHAIN_TO_TOKEN, Token } from "@/registries/ChainTokenRegistry";

type WalletPreferencesContextType = {
  currentChain: Chain;
  defaultChain: Chain | undefined;
  defaultWallet: Address | null | undefined;
  currentChainDefaultToken: Token;
  currentChainSupportedTokens: Partial<Record<"JPYC" | "USDC" | "EURC", string>>;
  setCurrentChain: React.Dispatch<React.SetStateAction<Chain>>;
  refetchUserSetting: ReturnType<typeof useGetUserSetting>["refetch"];
};

export const WalletPreferencesContext = createContext<WalletPreferencesContextType | undefined>(undefined);

export const WalletPreferencesProvider = ({ children }: PropsWithChildren) => {
  const { data, refetch } = useGetUserSetting();
  const [currentChain, setCurrentChain] = useState<Chain>("polygon");

  const defaultChain = useMemo(() => {
    if (!data?.defaultChain) return undefined;
    return data.defaultChain;
  }, [data?.defaultChain]);

  const defaultWallet = useMemo(() => {
    if (!data?.defaultWallet) return undefined;
    return data.defaultWallet;
  }, [data?.defaultWallet]);

  const currentChainDefaultToken = useMemo(() => SUPPORT_CHAIN_TO_TOKEN[currentChain][0], [currentChain]);

  const currentChainSupportedTokens = useMemo(() => {
    return SUPPORT_CHAIN_TO_TOKEN[currentChain].reduce<Partial<Record<Token, string>>>((acc, token) => {
      acc[token] = token;
      return acc;
    }, {});
  }, [currentChain]);

  useEffect(() => {
    if (!defaultChain) return;
    setCurrentChain(defaultChain);
  }, [defaultChain]);

  return (
    <WalletPreferencesContext.Provider
      value={{
        currentChain,
        defaultChain,
        defaultWallet,
        currentChainDefaultToken,
        currentChainSupportedTokens,
        setCurrentChain,
        refetchUserSetting: refetch
      }}
    >
      {children}
    </WalletPreferencesContext.Provider>
  );
};

export const useWalletPreferencesContext = () => {
  const ctx = useContext(WalletPreferencesContext);
  if (!ctx) throw new Error("UserSettingProvider is not mounted. Wrap your component with <UserSettingProvider>.");
  return ctx;
};
