import { Address } from "viem";

import { SupportChain } from "@/configs/chain";

export type UserSettingModel = {
  name: string;
  selectedChain: SupportChain;
  defaultWallet: Address | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateSelectedChainCommand = {
  selectedChain: SupportChain;
};

export type UpdateDefaultWalletCommand = {
  defaultWallet: Address | null;
};
