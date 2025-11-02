import { createContext, PropsWithChildren, useContext } from "react";

import { useLastTransaction } from "@/hooks/queries/useLastTransaction";

import { useHinomaruWalletContext } from "./HinomaruWalletProvider";
import { useUserSettingContext } from "./UserSettingProvider";

type LastTransactionContextType = ReturnType<typeof useLastTransaction>;

export const LastTransactionContext = createContext<LastTransactionContextType | undefined>(undefined);

export const LastTransactionProvider = ({ children }: PropsWithChildren) => {
  const { account } = useHinomaruWalletContext();
  const { currentChain } = useUserSettingContext();
  const queryResult = useLastTransaction(account?.address ?? "0x", currentChain, {
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
