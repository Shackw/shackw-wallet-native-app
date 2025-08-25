import { encodeFunctionData, erc20Abi, Hex } from "viem";

import { DEFAULT_CHAIN } from "@/configs/chains";
import { DELEGATE_CONTRACT_ADDRESS, TOKEN_TO_ADDRESS_MAP, TOKEN_TO_CONTRACT_MAP } from "@/configs/contracts";
import { VIEM_PUBLIC_CLIENT } from "@/configs/viem";
import { GetTokenBalanceCommand, TransferTokenCommand } from "@/models/token";
import { TokenRepository } from "@/repositories/token";
import { TransferTokenPayload } from "@/repositories/token/dto";
import { toDisplayValue, toWei } from "@/utils/tokenUnits";

export const TokenService = {
  async getTokenBalance(command: GetTokenBalanceCommand): Promise<string> {
    const { wallet, token } = command;
    const erc20Contract = TOKEN_TO_CONTRACT_MAP[token];
    try {
      const balance = await erc20Contract.read.balanceOf([wallet]);
      return toDisplayValue(balance, token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`getTokenBalance error: ${error.message}`, { cause: error });
      }
      throw new Error(`getTokenBalance unknown error: ${String(error)}`);
    }
  },

  async transferToken(command: TransferTokenCommand): Promise<Hex> {
    const { account, client, token, to, amount } = command;
    try {
      const nonce = await VIEM_PUBLIC_CLIENT.getTransactionCount({
        address: account.address,
        blockTag: "pending"
      });
      const authorization = await client.signAuthorization({
        account,
        contractAddress: DELEGATE_CONTRACT_ADDRESS,
        chainId: DEFAULT_CHAIN.id,
        nonce
      });

      const transferCalldata = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [to, toWei(amount, token)]
      });
      const call = {
        to: TOKEN_TO_ADDRESS_MAP[token],
        value: 0n,
        data: transferCalldata
      } as const;

      const payload: TransferTokenPayload = {
        from: account.address,
        chainId: DEFAULT_CHAIN.id,
        authorization,
        call,
        revertOnFail: true,
        value: call.value
      };

      const hash = await TokenRepository.transfer(payload);
      return hash;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`transferToken error: ${error.message}`, { cause: error });
      }
      throw new Error(`transferToken unknown error: ${String(error)}`);
    }
  }
};
