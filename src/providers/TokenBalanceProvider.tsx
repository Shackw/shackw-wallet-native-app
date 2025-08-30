import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

import { useTokenBalance } from "@/hooks/queries/useTokenBalance";
import { Token } from "@/registries/TokenRegistry";

import { useHinomaruWalletContext } from "./HinomaruWalletProvider";

type TokenBalanceContextType = Record<
  Token,
  {
    balance: string | undefined;
    error: Error | null;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<string, Error>>;
  }
>;

export const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined);

export const TokenBalanceProvider = ({ children }: { children: ReactNode }) => {
  const { account } = useHinomaruWalletContext();
  const {
    data: jpycBalance,
    error: errorUsdc,
    refetch: refetchUsdc
  } = useTokenBalance(account?.address ?? "0x", "JPYC", { retry: 1, enabled: !!account?.address });
  const {
    data: usdcBalance,
    error: errorJpyc,
    refetch: refetchJpyc
  } = useTokenBalance(account?.address ?? "0x", "USDC", { retry: 1, enabled: !!account?.address });
  const {
    data: eurcBalance,
    error: errorEurc,
    refetch: refetchEurc
  } = useTokenBalance(account?.address ?? "0x", "EURC", { retry: 1, enabled: !!account?.address });

  return (
    <TokenBalanceContext.Provider
      value={{
        JPYC: { balance: jpycBalance, error: errorJpyc, refetch: refetchJpyc },
        USDC: { balance: usdcBalance, error: errorUsdc, refetch: refetchUsdc },
        EURC: { balance: eurcBalance, error: errorEurc, refetch: refetchEurc }
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
