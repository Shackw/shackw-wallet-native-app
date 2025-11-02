import { UseQueryResult } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext } from "react";

import { useTokenBalance } from "@/hooks/queries/useTokenBalance";
import { Token } from "@/registries/TokenRegistry";

import { useHinomaruWalletContext } from "./HinomaruWalletProvider";
import { useUserSettingContext } from "./UserSettingProvider";

type TokenBalanceContextType = Record<Token, Omit<UseQueryResult<string>, "data"> & { balance: string | undefined }>;

export const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined);

export const TokenBalanceProvider = ({ children }: PropsWithChildren) => {
  const { account } = useHinomaruWalletContext();
  const { currentChain: chain } = useUserSettingContext();

  const { data: jpycData, ...restJpycResult } = useTokenBalance(
    {
      chain,
      wallet: account?.address ?? "0x",
      token: "JPYC"
    },
    {
      retry: 1,
      enabled: !!account?.address
    }
  );
  const jpycBalance = restJpycResult.isFetched && !jpycData ? "0" : jpycData;

  const { data: usdcData, ...restUsdcResult } = useTokenBalance(
    {
      chain,
      wallet: account?.address ?? "0x",
      token: "USDC"
    },
    {
      retry: 1,
      enabled: !!account?.address
    }
  );
  const usdcBalance = restUsdcResult.isFetched && !usdcData ? "0" : usdcData;

  const { data: eurcData, ...restEurcResult } = useTokenBalance(
    {
      chain,
      wallet: account?.address ?? "0x",
      token: "EURC"
    },
    {
      retry: 1,
      enabled: !!account?.address
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
