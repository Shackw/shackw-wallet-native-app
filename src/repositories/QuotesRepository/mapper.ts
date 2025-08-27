import { QuoteModel } from "@/models/quote";

import { CreateQuoteResponce } from "./dto";

export const responceToQuoteModel = (res: CreateQuoteResponce): QuoteModel => {
  const { token, feeToken, policy, ...rest } = res;
  return {
    ...rest,
    token: token.symbol,
    feeToken: feeToken.symbol,
    policy: {
      bps: policy.bps,
      cap: policy.cap.minUnit
    }
  };
};
