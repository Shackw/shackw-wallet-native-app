import { UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

import { useTokenBalance } from "@/hooks/queries/useTokenBalance";
import { Token } from "@/registries/TokenRegistry";

import { useHinomaruWalletContext } from "./HinomaruWalletProvider";

type TokenBalanceContextType = Record<Token, Omit<UseQueryResult<string>, "data"> & { balance: string | undefined }>;

export const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined);

export const TokenBalanceProvider = ({ children }: { children: ReactNode }) => {
  const { account } = useHinomaruWalletContext();
  const { data: jpycBalance, ...restJpycResult } = useTokenBalance(account?.address ?? "0x", "JPYC", {
    retry: 1,
    enabled: !!account?.address
  });
  const { data: usdcBalance, ...restUsdcResult } = useTokenBalance(account?.address ?? "0x", "USDC", {
    retry: 1,
    enabled: !!account?.address
  });
  const { data: eurcBalance, ...restEurcResult } = useTokenBalance(account?.address ?? "0x", "EURC", {
    retry: 1,
    enabled: !!account?.address
  });

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
