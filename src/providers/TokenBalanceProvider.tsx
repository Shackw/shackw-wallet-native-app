import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

import { TokenKind } from "@/shared/domain/tokens/registry";
import { useTokenBalance } from "@/shared/queries/useTokenBalance";

import { useHinomaruWalletContext } from "./HinomaruWalletProvider";

type TokenBalanceContextType = Record<
  TokenKind,
  {
    balance: string | undefined;
    error: Error | null;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<string, Error>>;
  }
> & {
  tokenToBalance: Record<TokenKind, string | undefined>;
  tokenToRefetch: Record<
    TokenKind,
    (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<string, Error>>
  >;
};

export const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined);

export const TokenBalanceProvider = ({ children }: { children: ReactNode }) => {
  const { eoaAccount: account } = useHinomaruWalletContext();
  const {
    data: jpycBalance,
    error: errorUsdc,
    refetch: refetchUsdc
  } = useTokenBalance(account?.address ?? "0x", "JPYC", { enabled: !!account?.address });
  const {
    data: usdcBalance,
    error: errorJpyc,
    refetch: refetchJpyc
  } = useTokenBalance(account?.address ?? "0x", "USDC", { enabled: !!account?.address });
  const {
    data: eurcBalance,
    error: errorEurc,
    refetch: refetchEurc
  } = useTokenBalance(account?.address ?? "0x", "EURC", { enabled: !!account?.address });

  const tokenToBalance = {
    JPYC: jpycBalance,
    USDC: usdcBalance,
    EURC: eurcBalance
  } satisfies Record<TokenKind, string | undefined>;

  const tokenToRefetch = {
    JPYC: refetchJpyc,
    USDC: refetchUsdc,
    EURC: refetchEurc
  } satisfies Record<TokenKind, (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<string, Error>>>;

  return (
    <TokenBalanceContext.Provider
      value={{
        JPYC: { balance: jpycBalance, error: errorJpyc, refetch: refetchJpyc },
        USDC: { balance: usdcBalance, error: errorUsdc, refetch: refetchUsdc },
        EURC: { balance: eurcBalance, error: errorEurc, refetch: refetchUsdc },
        tokenToBalance,
        tokenToRefetch
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
