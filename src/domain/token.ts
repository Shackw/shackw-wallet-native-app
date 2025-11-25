import { Account, WalletClient, Address } from "viem";

import { Chain } from "@/config/chain";
import { Token } from "@/registries/ChainTokenRegistry";

export type GetTokenBalanceCommand = {
  chain: Chain;
  wallet: Address;
  token: Token;
};

export type TransferTokenCommand = {
  account: Account;
  client: WalletClient;
  token: Token;
  feeToken: Token;
  recipient: Address;
  amountDisplayValue: number;
  webhookUrl?: string;
};
