import { useCallback, useState } from "react";

import type {
  IWalletConnectHandlers,
  ShackwAuthorizeTransferParams,
  ShackwAuthorizeTransferResult
} from "@/application/ports/IWalletConnectHandlers";

type PendingAuthorizeTransfer = {
  params: ShackwAuthorizeTransferParams;
  resolve: (res: ShackwAuthorizeTransferResult) => void;
};

export const useWcAuthorizeTransfer = () => {
  const [pendingTransfer, setPendingTransfer] = useState<PendingAuthorizeTransfer | null>(null);

  const onAuthorizeTransfer = useCallback<IWalletConnectHandlers["onAuthorizeTransfer"]>(async params => {
    console.log("[WalletConnect] shackw_authorizeTransfer:", params);

    return {
      approved: false
    };
  }, []);

  // TODO
  const onApproveTransfer = useCallback(() => {
    if (!pendingTransfer) return;
    pendingTransfer.resolve({ approved: true });
    setPendingTransfer(null);
  }, [pendingTransfer]);

  // TODO
  const onRejectTransfer = useCallback(() => {
    if (!pendingTransfer) return;
    pendingTransfer.resolve({ approved: false });
    setPendingTransfer(null);
  }, [pendingTransfer]);

  return {
    pendingTransfer,
    onAuthorizeTransfer,
    onApproveTransfer,
    onRejectTransfer
  };
};
