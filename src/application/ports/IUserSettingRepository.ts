import type { SupportChain } from "@/config/chain";

import type { Address } from "viem";

export interface IUserSettingRepository {
  get(): Promise<UserSettingResult | null>;
  patch(query: PatchUserSettingQuery): Promise<void>;
}

export type UserSettingResult = {
  name: string;
  defaultChain: SupportChain;
  defaultWallet: Address | null;
  updatedAt: Date;
  createdAt: Date;
};

export type PatchUserSettingQuery = { defaultChain?: SupportChain; defaultWallet?: Address | null };
