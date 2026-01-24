import { createContext, useContext } from "react";

import { useGetTokenBalance } from "@/presentation/hooks/queries/useGetTokenBalance";
import type { Token } from "@/registries/ChainTokenRegistry";

import { useShackwWalletContext } from "./ShackwWalletProvider";
import { useWalletPreferencesContext } from "./WalletPreferencesProvider";

import type { UseQueryResult } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

type TokenBalanceContextType = Record<Token, Omit<UseQueryResult<string>, "data"> & { balance: string | undefined }>;

export const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined);

export const TokenBalanceProvider = ({ children }: PropsWithChildren) => {
  const { account } = useShackwWalletContext();
  const { currentChain: chain, currentChainSupportedTokens } = useWalletPreferencesContext();

  const { data: jpycData, ...restJpycResult } = useGetTokenBalance(
    {
      chain,
      wallet: account?.address ?? "0x",
      token: "JPYC"
    },
    {
      retry: 1,
      enabled: !!account?.address && !!currentChainSupportedTokens.JPYC
    }
  );
  const jpycBalance = restJpycResult.isFetched && !jpycData ? "0" : jpycData;

  const { data: usdcData, ...restUsdcResult } = useGetTokenBalance(
    {
      chain,
      wallet: account?.address ?? "0x",
      token: "USDC"
    },
    {
      retry: 1,
      enabled: !!account?.address && !!currentChainSupportedTokens.USDC
    }
  );
  const usdcBalance = restUsdcResult.isFetched && !usdcData ? "0" : usdcData;

  const { data: eurcData, ...restEurcResult } = useGetTokenBalance(
    {
      chain,
      wallet: account?.address ?? "0x",
      token: "EURC"
    },
    {
      retry: 1,
      enabled: !!account?.address && !!currentChainSupportedTokens.EURC
    }
  );
  const eurcBalance = restEurcResult.isFetched && !eurcData ? "0" : eurcData;

  return (
    <TokenBalanceContext.Provider
      value={{
        JPYC: { balance: jpycBalance, ...restJpycResult },
        USDC: { balance: usdcBalance, ...restUsdcResult },
        EURC: { balance: eurcBalance, ...restEurcResult }
      }}
    >
      {children}
    </TokenBalanceContext.Provider>
  );
};

export const useTokenBalanceContext = () => {
  const ctx = useContext(TokenBalanceContext);
  if (!ctx) throw new Error("TokenBalanceProvider is not mounted. Wrap your component with <TokenBalanceProvider>.");
  return ctx;
};
