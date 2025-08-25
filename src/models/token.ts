import { Account, WalletClient, Address } from "viem";

import { TokenKind } from "@/configs/token";

export type GetTokenBalanceCommand = { wallet: Address; token: TokenKind };

export type TransferTokenCommand = {
  account: Account;
  client: WalletClient;
  token: TokenKind;
  to: Address;
  amount: number;
};
