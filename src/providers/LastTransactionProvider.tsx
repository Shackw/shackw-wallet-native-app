import { createContext, ReactNode, useContext } from "react";

import { useLastTransaction } from "@/hooks/queries/useLastTransaction";

import { useHinomaruWalletContext } from "./HinomaruWalletProvider";

type LastTransactionContextType = ReturnType<typeof useLastTransaction>;

export const LastTransactionContext = createContext<LastTransactionContextType | undefined>(undefined);

export const LastTransactionProvider = ({ children }: { children: ReactNode }) => {
  const { account } = useHinomaruWalletContext();
  const queryResult = useLastTransaction(account?.address ?? "0x", {
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
