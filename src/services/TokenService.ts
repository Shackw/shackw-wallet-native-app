import { Hex } from "viem";

import { DEFAULT_CHAIN } from "@/configs/chain";
import { TOKEN_TO_CONTRACT_MAP } from "@/configs/contract";
import { VIEM_PUBLIC_CLIENT } from "@/configs/viem";
import { GetTokenBalanceCommand, TransferTokenCommand } from "@/models/token";
import { QuotesRepository } from "@/repositories/QuotesRepository";
import { CreateQuotePayload } from "@/repositories/QuotesRepository/dto";
import { TokenRepository } from "@/repositories/TokenRepository";
import { TransferTokenPayload } from "@/repositories/TokenRepository/dto";
import { toDisimalsStr, toMinUnits } from "@/utils/tokenUnits";

export const TokenService = {
  async getTokenBalance(command: GetTokenBalanceCommand): Promise<string> {
    const { wallet, token } = command;
    const erc20Contract = TOKEN_TO_CONTRACT_MAP[token];
    try {
      const balance = await erc20Contract.read.balanceOf([wallet]);
      return toDisimalsStr(balance, token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`getTokenBalance error: ${error.message}`, { cause: error });
      }
      throw new Error(`getTokenBalance unknown error: ${String(error)}`);
    }
  },

  async transferToken(command: TransferTokenCommand): Promise<Hex> {
    const { account, client, token, recipient, amountDecimals } = command;
    try {
      const createQuotePayload: CreateQuotePayload = {
        chainId: DEFAULT_CHAIN.id,
        sender: account.address,
        recipient,
        token: {
          symbol: token
        },
        amountMinUnits: toMinUnits(amountDecimals, token)
      };
      const { delegate, quoteToken } = await QuotesRepository.create(createQuotePayload);

      const nonce = await VIEM_PUBLIC_CLIENT.getTransactionCount({
        address: account.address,
        blockTag: "pending"
      });
      const authorization = await client.signAuthorization({
        account,
        contractAddress: delegate,
        chainId: DEFAULT_CHAIN.id,
        nonce
      });

      const transferTokenPayload: TransferTokenPayload = {
        quoteToken,
        authorization
      };
      const { status, txHash } = await TokenRepository.transfer(transferTokenPayload);

      if (status === "alreadyExecuted") {
        throw new Error("transferToken error: alreadyExecuted");
      }
      return txHash;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`transferToken error: ${error.message}`, { cause: error });
      }
      throw new Error(`transferToken unknown error: ${String(error)}`);
    }
  }
};
