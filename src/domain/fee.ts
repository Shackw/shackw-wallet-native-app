import { Token } from "@/registries/TokenRegistry";

export type FeeModel = {
  token: Token;
  feeToken: Token;
  feeMinUnits: bigint;
  feeDisplayValue: number;
  policy: { bps: bigint; cap: bigint };
};

export type EstimateFeeCommand = {
  amountDisplayValue: number;
  token: Token;
  feeToken: Token;
};
