import { Chain } from "@/config/chain";
import { Token } from "@/registries/TokenRegistry";

type TokenAmountMeta = {
  minUnits: bigint;
  display: number;
};

export type TokenMeta = {
  minTransfer: TokenAmountMeta;
  fixedFee: TokenAmountMeta;
};

export type WalletMetaModel = Record<Chain, Record<Token, TokenMeta>>;
