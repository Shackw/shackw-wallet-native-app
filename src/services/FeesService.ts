import { SupportChain } from "@/configs/chain";
import { CustomError } from "@/exceptions";
import { toMinUnits } from "@/helpers/tokenUnits";
import { EstimateFeeCommand, FeeModel } from "@/models/fee";
import { FeesRepository } from "@/repositories/FeesRepository";
import { EstimateFeeQuery, EstimateFeeResult } from "@/repositories/FeesRepository/interface";

export const FeesService = {
  async estimateFee(chain: SupportChain, command: EstimateFeeCommand): Promise<FeeModel> {
    const { token, feeToken, amountDecimals } = command;
    try {
      const query: EstimateFeeQuery = {
        chain,
        token: { symbol: token },
        feeToken: { symbol: feeToken },
        amountMinUnits: toMinUnits(amountDecimals, token)
      };

      const fee = await FeesRepository.estimate(query);
      return responceToModel(fee);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError)
        throw new Error(`手数料の見積もりに失敗しました: ${error.message}`, { cause: error });

      throw new Error(`手数料の見積もりに失敗しました（不明なエラー）: ${String(error)}`);
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
