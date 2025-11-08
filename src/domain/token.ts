import { Account, WalletClient, Address } from "viem";

import { SupportChain } from "@/config/chain";
import { Token } from "@/registries/TokenRegistry";

export type GetTokenBalanceCommand = {
  chain: SupportChain;
  wallet: Address;
  token: Token;
};

export type TransferTokenCommand = {
  account: Account;
  client: WalletClient;
  token: Token;
  feeToken: Token;
  recipient: Address;
  amountDecimals: number;
  webhookUrl?: string;
};
