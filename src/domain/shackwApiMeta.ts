import type { Chain } from "@/config/chain";
import type { Token } from "@/registries/ChainTokenRegistry";

export type TokenAmountMeta = {
  minUnits: bigint;
  display: number;
};

export type WalletMetaItem = {
  minTransfer: TokenAmountMeta;
  fixedFee: TokenAmountMeta;
};

export type ShackwApiMetaModel = Record<Chain, Partial<Record<Token, WalletMetaItem>>>;
