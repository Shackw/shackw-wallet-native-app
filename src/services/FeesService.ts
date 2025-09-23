import { DEFAULT_CHAIN } from "@/configs/chain";
import { toMinUnits } from "@/helpers/tokenUnits";
import { EstimateFeeCommand, FeeModel } from "@/models/fee";
import { FeesRepository } from "@/repositories/FeesRepository";
import { EstimateFeeQuery, EstimateFeeResult } from "@/repositories/FeesRepository/interface";

export const FeesService = {
  async estimateFee(command: EstimateFeeCommand): Promise<FeeModel> {
    const { token, feeToken, amountDecimals } = command;
    try {
      const query: EstimateFeeQuery = {
        token: { symbol: token },
        feeToken: { symbol: feeToken },
        chainId: DEFAULT_CHAIN.id,
        amountMinUnits: toMinUnits(amountDecimals, token)
      };

      const fee = await FeesRepository.estimate(query);
      return responceToModel(fee);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`estimateFee error: ${error.message}`, { cause: error });
      }
      throw new Error(`estimateFee unknown error: ${String(error)}`);
    }
  }
};

function responceToModel(responce: EstimateFeeResult): FeeModel {
  const { token, feeToken, feeMinUnits, feeDecimals, policy } = responce;
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
}
