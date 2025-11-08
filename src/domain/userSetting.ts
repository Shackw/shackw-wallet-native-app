import { Address } from "viem";

import { SupportChain } from "@/config/chain";

export type UserSettingModel = {
  name: string;
  defaultChain: SupportChain;
  defaultWallet: Address | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateSelectedChainCommand = {
  defaultChain: SupportChain;
};

export type UpdateDefaultWalletCommand = {
  defaultWallet: Address | null;
};
