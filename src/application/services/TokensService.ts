import { Hex } from "viem";

import { CreateQuoteQuery, IQuotesRepository } from "@/application/ports/IQuotesRepository";
import { ITokensRepository, TransferTokenQuery } from "@/application/ports/ITokensRepository";
import { SUPPORT_CHAINS, SupportChain } from "@/config/chain";
import { VIEM_PUBLIC_CLIENTS } from "@/config/viem";
import { GetTokenBalanceCommand, TransferTokenCommand } from "@/domain/token";
import { HinomaruApiErrorBody } from "@/infrastructure/clients/restClient";
import { TOKEN_REGISTRY } from "@/registries/TokenRegistry";
import { ApiError, CustomError } from "@/shared/exceptions";
import { toDisplyValueStr, toMinUnits } from "@/shared/helpers/tokenUnits";

export const TokensService = {
  async getTokenBalance(command: GetTokenBalanceCommand): Promise<string> {
    const { chain, wallet, token } = command;
    const erc20Contract = TOKEN_REGISTRY[token].contract[chain];
    try {
      const balance = await erc20Contract.read.balanceOf([wallet]);
      return toDisplyValueStr(balance, token);
    } catch (error: unknown) {
      console.warn(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーにより ${token} の残高取得に失敗しました。`);
    }
  },

  async transferToken(
    chain: SupportChain,
    command: TransferTokenCommand,
    quotesRepository: IQuotesRepository,
    tokenRepository: ITokensRepository
  ): Promise<Hex> {
    const { account, client, token, feeToken, recipient, amountDecimals, webhookUrl } = command;

    const createQuoteQuery: CreateQuoteQuery = {
      chain,
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
      const publicClient = VIEM_PUBLIC_CLIENTS[chain];
      const { delegate, quoteToken } = await quotesRepository.create(createQuoteQuery);

      const nonce = await publicClient.getTransactionCount({
        address: account.address,
        blockTag: "pending"
      });
      const authorization = await client.signAuthorization({
        account,
        contractAddress: delegate,
        chainId: SUPPORT_CHAINS[chain].id,
        nonce
      });

      const transferTokenQuery: TransferTokenQuery = {
        chain,
        quoteToken,
        authorization,
        notify: webhookUrl
          ? {
              webhook: {
                id: "wallet:transfer",
                url: webhookUrl,
                echo: "mySecretVerificationToken"
              }
            }
          : undefined
      };
      const { txHash } = await tokenRepository.transfer(transferTokenQuery);

      return txHash;
    } catch (error: unknown) {
      console.error(error);

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
