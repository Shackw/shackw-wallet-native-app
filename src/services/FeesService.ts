import { DEFAULT_CHAIN } from "@/configs/chain";
import { EstimateFeeCommand, FeeModel } from "@/models/fee";
import { FeesRepository } from "@/repositories/FeesRepository";
import { EstimateFeePayload } from "@/repositories/FeesRepository/interface";
import { toMinUnits } from "@/utils/tokenUnits";

export const FeesService = {
  async estimateFee(command: EstimateFeeCommand): Promise<FeeModel> {
    const { token, feeToken, amountDecimals } = command;
    try {
      const payload: EstimateFeePayload = {
        token: { symbol: token },
        feeToken: { symbol: feeToken },
        chainId: DEFAULT_CHAIN.id,
        amountMinUnits: toMinUnits(amountDecimals, token)
      };

      const fee = await FeesRepository.estimate(payload);
      return fee;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`estimateFee error: ${error.message}`, { cause: error });
      }
      throw new Error(`estimateFee unknown error: ${String(error)}`);
    }
  }
};
