import * as v from "valibot";

import { Chain } from "@/config/chain";
import { ShackwAuthorizeTransferParamsSchema } from "@/shared/validations/schemas/ShackwAuthorizeTransferParamsSchema";
import { ShackwSignInParamsSchema } from "@/shared/validations/schemas/ShackwSignInParamsSchema";

import type { SignClientTypes } from "@walletconnect/types";
import type { Address, Hash, Hex } from "viem";

export type SessionProposalDecision = "approve" | "reject";

export type WalletConnectRequestBase = {
  topic: string;
};

export interface IWalletConnectHandlers {
  // ====== Session proposal ======
  onSessionProposal: (proposal: SignClientTypes.EventArguments["session_proposal"]) => Promise<"approve" | "reject">;

  // ====== Session delete ======
  onSessionDelete: (event: SignClientTypes.EventArguments["session_delete"]) => Promise<void>;

  // ====== shackw_signIn ======
  onSignIn: (params: ShackwSignInParams) => Promise<ShackwSignInResult>;

  // ====== shackw_getAccount ======
  onGetAccount: (params: ShackwGetAccountParams) => Promise<ShackwAccountInfo>;

  // ====== shackw_authorizeTransfer ======
  onAuthorizeTransfer: (params: ShackwAuthorizeTransferParams) => Promise<ShackwAuthorizeTransferResult>;
}

export type ShackwSignInParams = WalletConnectRequestBase & v.InferOutput<typeof ShackwSignInParamsSchema>;

export type ShackwSignInResult = {
  address: Address;
  signature: Hex;
};

export type ShackwGetAccountParams = WalletConnectRequestBase;

export type ShackwAccountInfo = {
  address: Address;
  chain: {
    id: number;
    symbol: Chain;
  };
};

export type ShackwAuthorizeTransferParams = WalletConnectRequestBase &
  v.InferOutput<typeof ShackwAuthorizeTransferParamsSchema>;

export type ShackwAuthorizeTransferResult = {
  approved: boolean;
  txHash?: Hash;
};
