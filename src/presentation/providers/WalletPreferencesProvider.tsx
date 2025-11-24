import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Address } from "viem";

import { Chain } from "@/config/chain";
import { useUserSetting } from "@/presentation/hooks/queries/useUserSetting";
import { SUPPORT_CHAIN_TO_TOKEN, Token } from "@/registries/ChainTokenRegistry";

type WalletPreferencesContextType = {
  currentChain: Chain;
  defaultChain: Chain | undefined;
  defaultWallet: Address | null | undefined;
  currentChainSupportedTokens: Partial<Record<"JPYC" | "USDC" | "EURC", string>>;
  setCurrentChain: React.Dispatch<React.SetStateAction<Chain>>;
  refetch: ReturnType<typeof useUserSetting>["refetch"];
};

export const WalletPreferencesContext = createContext<WalletPreferencesContextType | undefined>(undefined);

export const WalletPreferencesProvider = ({ children }: PropsWithChildren) => {
  const { data, refetch } = useUserSetting();
  const [currentChain, setCurrentChain] = useState<Chain>("base");

  const defaultChain = useMemo(() => {
    if (!data) return undefined;
    return data.defaultChain;
  }, [data]);

  const defaultWallet = useMemo(() => {
    if (!data) return undefined;
    return data.defaultWallet;
  }, [data]);

  const currentChainSupportedTokens = useMemo(() => {
    return SUPPORT_CHAIN_TO_TOKEN[currentChain].reduce<Partial<Record<Token, string>>>((acc, token) => {
      acc[token] = token;
      return acc;
    }, {});
  }, [currentChain]);

  useEffect(() => {
    if (!!data) setCurrentChain(data.defaultChain);
  }, [data]);

  return (
    <WalletPreferencesContext.Provider
      value={{
        currentChain,
        defaultChain,
        defaultWallet,
        currentChainSupportedTokens,
        setCurrentChain,
        refetch
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
