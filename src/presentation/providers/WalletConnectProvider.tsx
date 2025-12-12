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
  sessionProposal: ReturnType<typeof useWcSessionProposal>;
  sessionDelete: ReturnType<typeof useWcSessionDelete>;
  signIn: ReturnType<typeof useWcSignIn>;
  getAccount: ReturnType<typeof useWcGetAccount>;
  authorizeTransfer: ReturnType<typeof useWcAuthorizeTransfer>;
};

export const WalletConnectContext = createContext<WalletConnectType | undefined>(undefined);

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  const { account } = useShackwWalletContext();
  const [wcClient, setWcClient] = useState<WalletConnectClient | null>(null);

  const sessionProposal = useWcSessionProposal();
  const sessionDelete = useWcSessionDelete(wcClient);
  const signIn = useWcSignIn();
  const getAccount = useWcGetAccount();
  const authorizeTransfer = useWcAuthorizeTransfer();

  const handlers: IWalletConnectHandlers = useMemo(
    () => ({
      onSessionProposal: sessionProposal.onSessionProposal,
      onSessionDelete: sessionDelete.onSessionDelete,
      onSignIn: signIn.onSignIn,
      onGetAccount: getAccount.onGetAccount,
      onAuthorizeTransfer: authorizeTransfer.onAuthorizeTransfer
    }),
    [
      sessionProposal.onSessionProposal,
      sessionDelete.onSessionDelete,
      signIn.onSignIn,
      getAccount.onGetAccount,
      authorizeTransfer.onAuthorizeTransfer
    ]
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

  return (
    <WalletConnectContext.Provider
      value={{ wcClient, sessionProposal, sessionDelete, signIn, getAccount, authorizeTransfer }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnectContext = () => {
  const ctx = useContext(WalletConnectContext);
  if (!ctx) throw new Error("WalletConnectProvider is not mounted. Wrap your component with <WalletConnectProvider>.");
  return ctx;
};
