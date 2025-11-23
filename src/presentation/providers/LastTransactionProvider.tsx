import { createContext, PropsWithChildren, useContext } from "react";

import { useGetLastTransaction } from "@/presentation/hooks/queries/useGetLastTransaction";

import { useShackwWalletContext } from "./ShackwWalletProvider";
import { useWalletPreferencesContext } from "./WalletPreferencesProvider";

type LastTransactionContextType = ReturnType<typeof useGetLastTransaction>;

export const LastTransactionContext = createContext<LastTransactionContextType | undefined>(undefined);

export const LastTransactionProvider = ({ children }: PropsWithChildren) => {
  const { account } = useShackwWalletContext();
  const { currentChain } = useWalletPreferencesContext();
  const queryResult = useGetLastTransaction(account?.address ?? "0x", currentChain, {
    retry: 0,
    enabled: !!account?.address
  });

  return (
    <LastTransactionContext.Provider
      value={{
        ...queryResult
      }}
    >
      {children}
    </LastTransactionContext.Provider>
  );
};

export const useLastTransactionContext = () => {
  const ctx = useContext(LastTransactionContext);
  if (!ctx)
    throw new Error("LastTransactionProvider is not mounted. Wrap your component with <LastTransactionProvider>.");
  return ctx;
};
