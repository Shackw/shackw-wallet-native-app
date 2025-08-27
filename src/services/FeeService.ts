import { DEFAULT_CHAIN } from "@/configs/chains";
import { EstimateFeeCommand, FeeModel } from "@/models/fee";
import { FeeRepository } from "@/repositories/FeeRepository";
import { EstimateFeePayload } from "@/repositories/FeeRepository/dto";
import { toMinUnits } from "@/utils/tokenUnits";

export const FeeService = {
  async estimateFee(command: EstimateFeeCommand): Promise<FeeModel> {
    const { token, feeToken, amountDecimals } = command;
    try {
      const payload: EstimateFeePayload = {
        token: { symbol: token },
        feeToken: { symbol: feeToken },
        chainId: DEFAULT_CHAIN.id,
        amountMinUnits: toMinUnits(amountDecimals, token)
      };

      const fee = await FeeRepository.estimate(payload);
      return fee;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`estimateFee error: ${error.message}`, { cause: error });
      }
      throw new Error(`estimateFee unknown error: ${String(error)}`);
    }
  }
};
