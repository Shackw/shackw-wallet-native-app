import type { SignClientTypes } from "@walletconnect/types";

export interface IWalletConnectHandlers {
  onSessionProposal: SessionProposalHandler;
  onAuthSignRequest: AuthSignHandler;
}

export type SessionProposalHandler = (
  proposal: SignClientTypes.EventArguments["session_proposal"]
) => Promise<"approve" | "reject">;

type AuthSignHandlerPayload = {
  topic: string;
  method: "personal_sign" | "eth_signTypedData_v4";
  params: any[];
};
export type AuthSignHandler = (payload: AuthSignHandlerPayload) => Promise<{ approved: boolean; signature?: string }>;
