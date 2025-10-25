import { Account, WalletClient, Address } from "viem";

import { Token } from "@/registries/TokenRegistry";

export type GetTokenBalanceCommand = { wallet: Address; token: Token };

export type TransferTokenCommand = {
  account: Account;
  client: WalletClient;
  token: Token;
  feeToken: Token;
  recipient: Address;
  amountDecimals: number;
  webhookUrl?: string;
};
