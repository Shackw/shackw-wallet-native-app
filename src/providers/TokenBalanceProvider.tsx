import { UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

import { useTokenBalance } from "@/hooks/queries/useTokenBalance";
import { Token } from "@/registries/TokenRegistry";

import { useHinomaruWalletContext } from "./HinomaruWalletProvider";

type TokenBalanceContextType = Record<Token, Omit<UseQueryResult<string>, "data"> & { balance: string | undefined }>;

export const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined);

export const TokenBalanceProvider = ({ children }: { children: ReactNode }) => {
  const { account } = useHinomaruWalletContext();
  const { data: jpycData, ...restJpycResult } = useTokenBalance(account?.address ?? "0x", "JPYC", {
    retry: 1,
    enabled: !!account?.address
  });
  const jpycBalance = restJpycResult.isFetched && !jpycData ? "0" : jpycData;
  const { data: usdcData, ...restUsdcResult } = useTokenBalance(account?.address ?? "0x", "USDC", {
    retry: 1,
    enabled: !!account?.address
  });
  const usdcBalance = restUsdcResult.isFetched && !usdcData ? "0" : usdcData;
  const { data: eurcData, ...restEurcResult } = useTokenBalance(account?.address ?? "0x", "EURC", {
    retry: 1,
    enabled: !!account?.address
  });
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
