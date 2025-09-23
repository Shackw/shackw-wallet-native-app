import { Hex } from "viem";

import { ApiError, HinomaruApiErrorBody } from "@/clients/restClient";
import { DEFAULT_CHAIN } from "@/configs/chain";
import { VIEM_PUBLIC_CLIENT } from "@/configs/viem";
import { toDecimalsStr, toMinUnits } from "@/helpers/tokenUnits";
import { GetTokenBalanceCommand, TransferTokenCommand } from "@/models/token";
import { TOKEN_REGISTRY } from "@/registries/TokenRegistry";
import { QuotesRepository } from "@/repositories/QuotesRepository";
import { CreateQuoteQuery } from "@/repositories/QuotesRepository/interface";
import { TokensRepository } from "@/repositories/TokensRepository";
import { TransferTokenQuery } from "@/repositories/TokensRepository/interface";

export const TokensService = {
  async getTokenBalance(command: GetTokenBalanceCommand): Promise<string> {
    const { wallet, token } = command;
    const erc20Contract = TOKEN_REGISTRY[token].contract;
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
    const { account, client, token, feeToken, recipient, amountDecimals } = command;

    const createQuoteQuery: CreateQuoteQuery = {
      chainId: DEFAULT_CHAIN.id,
      sender: account.address,
      recipient,
      token: {
        symbol: token
      },
      feeToken: {
        symbol: feeToken
      },
      amountMinUnits: toMinUnits(amountDecimals, token)
    };
    try {
      const { delegate, quoteToken } = await QuotesRepository.create(createQuoteQuery);

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

      const transferTokenQuery: TransferTokenQuery = {
        quoteToken,
        authorization
      };
      const { txHash } = await TokensRepository.transfer(transferTokenQuery);

      return txHash;
    } catch (error: unknown) {
      let mes = "送金処理中に不明なエラーが発生しました。";
      if (error instanceof ApiError) {
        const body = error.body as HinomaruApiErrorBody;
        const code = body.errors[0].code;

        if (code === "BAD_REQUEST") mes = "リクエスト内容が不正です。";
        if (code.includes("INSUFFICIENT")) mes = "残高が不足しています。";
        throw new Error(mes);
      }
      throw new Error(`${mes}: ${String(error)}`);
    }
  }
};
