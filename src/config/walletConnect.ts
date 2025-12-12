import { WalletKitTypes } from "@reown/walletkit";
import { ProposalTypes, SessionTypes } from "@walletconnect/types";
import { buildApprovedNamespaces, BuildApprovedNamespacesParams } from "@walletconnect/utils";
import { Address } from "viem";

import { CustomError } from "@/shared/exceptions";

import { CHAIN_IDS } from "./chain";

export const WALLETCONNECT_METADATA: WalletKitTypes.Options["metadata"] = {
  name: "ShackwWallet",
  description: "ShackwWallet is a non-custodial mobile wallet focused on stablecoin with EIP-7702 support.",
  url: "https://wallet.shackw.com",
  icons: ["https://wallet.shackw.com/icon.png"]
};

export const buildApprovedNamespacesForShackw = (
  proposal: ProposalTypes.Struct,
  account: Address
): SessionTypes.Namespaces => {
  const required = proposal.optionalNamespaces;

  const eip155 = required.eip155;
  if (!eip155?.chains?.length) {
    throw new CustomError("WalletConnect の要求チェーンが不正です。");
  }

  const requestedChains = eip155.chains;
  const supportedChains = CHAIN_IDS.map(c => `eip155:${c}`);
  const approvedChains = requestedChains.filter(id => supportedChains.includes(id));

  if (approvedChains.length === 0) {
    throw new CustomError("要求されたチェーンは ShackwWallet では使用できません。");
  }

  const accounts = approvedChains.map(chainId => `${chainId}:${account}`);

  const supportedNamespaces: BuildApprovedNamespacesParams["supportedNamespaces"] = {
    eip155: {
      methods: ["shackw_signIn", "shackw_getAccount", "shackw_authorizeTransfer"],
      events: ["chainChanged", "accountsChanged"],
      chains: approvedChains,
      accounts
    }
  };

  return buildApprovedNamespaces({
    proposal,
    supportedNamespaces
  });
};
