import { EstimateFeeQuery, EstimateFeeResult } from "@/application/ports/IFeesRepository";
import { SupportChain } from "@/config/chain";
import { EstimateFeeCommand, FeeModel } from "@/domain/fee";
import { HttpFeesRepository } from "@/infrastructure/http/HttpFeesRepository";
import { CustomError } from "@/shared/exceptions";
import { toDisplyValue, toMinUnits } from "@/shared/helpers/tokenUnits";

export const FeesService = {
  async estimateFee(chain: SupportChain, command: EstimateFeeCommand): Promise<FeeModel> {
    const { token, feeToken, amountDisplayValue: amountDecimals } = command;
    try {
      const query: EstimateFeeQuery = {
        chain,
        token: { symbol: token },
        feeToken: { symbol: feeToken },
        amountMinUnits: toMinUnits(amountDecimals, token)
      };

      const fee = await HttpFeesRepository.estimate(query);
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
  const { token, feeToken, fee, policy } = responce;
  return {
    token: token.symbol,
    feeToken: feeToken.symbol,
    feeMinUnits: fee.minUnits,
    feeDisplayValue: toDisplyValue(fee.minUnits, fee.symbol),
    policy: {
      bps: policy.bps,
      cap: policy.cap.minUnits
    }
  };
}
