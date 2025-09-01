import { Hex } from "viem";

import { DEFAULT_CHAIN } from "@/configs/chain";
import { VIEM_PUBLIC_CLIENT } from "@/configs/viem";
import { GetTokenBalanceCommand, TransferTokenCommand } from "@/models/token";
import { TOKEN_TO_CONTRACT } from "@/registries/TokenRegistry";
import { QuotesRepository } from "@/repositories/QuotesRepository";
import { CreateQuotePayload } from "@/repositories/QuotesRepository/interface";
import { TokensRepository } from "@/repositories/TokensRepository";
import { TransferTokenPayload } from "@/repositories/TokensRepository/interface";
import { toDecimalsStr, toMinUnits } from "@/utils/tokenUnits";

export const TokensService = {
  async getTokenBalance(command: GetTokenBalanceCommand): Promise<string> {
    const { wallet, token } = command;
    const erc20Contract = TOKEN_TO_CONTRACT[token];
    try {
      const balance = await erc20Contract.read.balanceOf([wallet]);
      return toDecimalsStr(balance, token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`getTokenBalance error: ${error.message}`);
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
        feeToken: {
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
      const { status, txHash } = await TokensRepository.transfer(transferTokenPayload);

      if (status === "alreadyExecuted") {
        throw new Error("transferToken error: alreadyExecuted");
      }
      return txHash;
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`transferToken error: ${error.message}`);
      }
      throw new Error(`transferToken unknown error: ${String(error)}`);
    }
  }
};
