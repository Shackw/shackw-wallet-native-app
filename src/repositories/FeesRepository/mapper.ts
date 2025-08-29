import { FeeModel } from "@/models/fee";

import { EstimateFeeResponce } from "./interface";

export const responceToFeeModel = (res: EstimateFeeResponce): FeeModel => {
  const { token, feeToken, feeMinUnits, feeDecimals, policy } = res;
  return {
    token: token.symbol,
    feeToken: feeToken.symbol,
    feeMinUnits,
    feeDecimals,
    policy: {
      bps: policy.bps,
      cap: policy.cap.minUnit
    }
  };
};
