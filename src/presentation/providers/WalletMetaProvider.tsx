import { createContext, ReactNode, useContext } from "react";

import { WalletMetaModel } from "@/domain/walletMeta";

type WalletMetaProviderProps = {
  meta: WalletMetaModel;
  children: ReactNode;
};

type WalletMetaContextValue = {
  meta: WalletMetaModel;
};

const WalletMetaContext = createContext<WalletMetaContextValue | undefined>(undefined);

export const WalletMetaProvider = (props: WalletMetaProviderProps) => {
  const { meta, children } = props;

  return <WalletMetaContext.Provider value={{ meta }}>{children}</WalletMetaContext.Provider>;
};

export const useWalletMetaContext = () => {
  const ctx = useContext(WalletMetaContext);
  if (!ctx) throw new Error("WalletMetaProvider is not mounted. Wrap your component with <WalletMetaProvider>.");
  return ctx;
};
