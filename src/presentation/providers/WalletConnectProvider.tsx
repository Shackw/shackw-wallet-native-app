import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState, useCallback } from "react";

import { IWalletConnectHandlers } from "@/application/ports/IWalletConnectHandlers";
import { WalletConnectClient } from "@/infrastructure/clients/WalletConnectClient";

import { useShackwWalletContext } from "./ShackwWalletProvider";

type WalletConnectType = {
  walletConnectClient: WalletConnectClient | null;
};

export const WalletConnectContext = createContext<WalletConnectType | undefined>(undefined);

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  const { account } = useShackwWalletContext();
  const [client, setClient] = useState<WalletConnectClient | null>(null);

  const onSessionProposal = useCallback<IWalletConnectHandlers["onSessionProposal"]>(async proposal => {
    console.log("Session proposal:", proposal);
    return "approve";
  }, []);

  const onAuthSignRequest = useCallback<IWalletConnectHandlers["onAuthSignRequest"]>(async payload => {
    console.log("Auth sign request:", payload);
    return { approved: false };
  }, []);

  const handlers: IWalletConnectHandlers = useMemo(() => {
    return {
      onSessionProposal,
      onAuthSignRequest
    };
  }, [onSessionProposal, onAuthSignRequest]);

  useEffect(() => {
    if (!account) return;

    let cancelled = false;

    (async () => {
      if (!client) {
        const inst = await WalletConnectClient.create(account.address, handlers);
        if (!cancelled) setClient(inst);
        return;
      }

      client.updateContext(account.address, handlers);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, handlers]);

  return (
    <WalletConnectContext.Provider value={{ walletConnectClient: client }}>{children}</WalletConnectContext.Provider>
  );
};

export const useWalletConnectContext = () => {
  const ctx = useContext(WalletConnectContext);
  if (!ctx) throw new Error("WalletConnectProvider not mounted.");
  return ctx;
};
