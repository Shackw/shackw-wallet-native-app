import { Token } from "@/registries/TokenRegistry";

export type FeeModel = {
  token: Token;
  feeToken: Token;
  feeMinUnits: bigint;
  feeDecimals: number;
  policy: { bps: number; cap: bigint };
};

export type EstimateFeeCommand = {
  amountDecimals: number;
  token: Token;
  feeToken: Token;
};
