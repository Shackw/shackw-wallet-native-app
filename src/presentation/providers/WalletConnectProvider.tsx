import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { IWalletConnectHandlers } from "@/application/ports/IWalletConnectHandlers";
import { WalletConnectClient } from "@/infrastructure/clients/WalletConnectClient";

import { useWcAuthorizeTransfer } from "../hooks/walletConnect/useWcAuthorizeTransfer";
import { useWcGetAccount } from "../hooks/walletConnect/useWcGetAccount";
import { useWcSessionDelete } from "../hooks/walletConnect/useWcSessionDelete";
import { useWcSessionProposal } from "../hooks/walletConnect/useWcSessionProposal";
import { useWcSignIn } from "../hooks/walletConnect/useWcSignIn";

import { useShackwWalletContext } from "./ShackwWalletProvider";

type WalletConnectType = {
  wcClient: WalletConnectClient | null;
};

export const WalletConnectContext = createContext<WalletConnectType | undefined>(undefined);

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  const { account } = useShackwWalletContext();
  const [wcClient, setWcClient] = useState<WalletConnectClient | null>(null);

  const { onSessionProposal } = useWcSessionProposal();
  const { onSessionDelete } = useWcSessionDelete(wcClient);
  const { onSignIn } = useWcSignIn();
  const { onGetAccount } = useWcGetAccount();
  const { onAuthorizeTransfer } = useWcAuthorizeTransfer();

  const handlers: IWalletConnectHandlers = useMemo(
    () => ({
      onSessionProposal,
      onSessionDelete,
      onSignIn,
      onGetAccount,
      onAuthorizeTransfer
    }),
    [onAuthorizeTransfer, onGetAccount, onSessionDelete, onSessionProposal, onSignIn]
  );

  useEffect(() => {
    if (!account) return;

    let cancelled = false;

    (async () => {
      if (!wcClient) {
        const inst = await WalletConnectClient.create(account.address, handlers);
        if (!cancelled) setWcClient(inst);
        return;
      }

      wcClient.updateContext(account.address, handlers);
    })();

    return () => {
      cancelled = true;
    };
  }, [account, wcClient, handlers]);

  return <WalletConnectContext.Provider value={{ wcClient }}>{children}</WalletConnectContext.Provider>;
};

export const useWalletConnectContext = () => {
  const ctx = useContext(WalletConnectContext);
  if (!ctx) throw new Error("WalletConnectProvider is not mounted. Wrap your component with <WalletConnectProvider>.");
  return ctx;
};
