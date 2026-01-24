import { useCallback, useState } from "react";

import type { IWalletConnectHandlers, SessionProposalDecision } from "@/application/ports/IWalletConnectHandlers";

import type { SignClientTypes } from "@walletconnect/types";

export type PendingSessionProposal = {
  proposal: SignClientTypes.EventArguments["session_proposal"];
  resolve: (decision: SessionProposalDecision) => void;
};

export const useWcSessionProposal = () => {
  const [pendingProposal, setPendingProposal] = useState<PendingSessionProposal | null>(null);

  const onSessionProposal = useCallback<IWalletConnectHandlers["onSessionProposal"]>(async proposal => {
    return await new Promise<SessionProposalDecision>(resolve => {
      setPendingProposal({ proposal, resolve });
    });
  }, []);

  const onApproveProposal = useCallback(() => {
    if (!pendingProposal) return;
    pendingProposal.resolve("approve");
    setPendingProposal(null);
  }, [pendingProposal]);

  const onRejectProposal = useCallback(() => {
    if (!pendingProposal) return;
    pendingProposal.resolve("reject");
    setPendingProposal(null);
  }, [pendingProposal]);

  return {
    pendingProposal,
    onSessionProposal,
    onApproveProposal,
    onRejectProposal
  };
};
