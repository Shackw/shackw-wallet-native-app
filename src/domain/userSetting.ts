import { Address } from "viem";

import { Chain } from "@/config/chain";

export type UserSettingModel = {
  name: string;
  defaultChain: Chain;
  defaultWallet: Address | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateDefaultChainCommand = {
  defaultChain: Chain;
};

export type UpdateDefaultWalletCommand = {
  defaultWallet: Address | null;
};
