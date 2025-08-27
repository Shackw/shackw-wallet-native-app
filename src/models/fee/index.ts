import { TokenKind } from "@/configs/token";

export type FeeModel = {
  token: TokenKind;
  feeToken: TokenKind;
  feeMinUnits: bigint;
  feeDecimals: number;
  policy: { bps: number; cap: bigint };
};

export type EstimateFeeCommand = {
  amountDecimals: number;
  token: TokenKind;
  feeToken: TokenKind;
};
