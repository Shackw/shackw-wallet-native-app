import { Hex } from "viem";

import { CreateQuoteQuery, IQuotesGateway } from "@/application/ports/IQuotesGateway";
import { Chain, CHAINS } from "@/config/chain";
import { VIEM_PUBLIC_CLIENTS } from "@/config/viem";
import { GetTokenBalanceCommand, TransferTokenCommand } from "@/domain/token";
import { TOKEN_REGISTRY } from "@/registries/ChainTokenRegistry";
import { ApiError, CustomError, ShackwApiErrorBody } from "@/shared/exceptions";
import { toDisplyValueStr, toMinUnits } from "@/shared/helpers/tokenUnits";

import { ITokensGateway, TransferTokenQuery } from "../ports/ITokensGateway";

export const TokensService = {
  async getTokenBalance(command: GetTokenBalanceCommand): Promise<string> {
    const { chain, wallet, token } = command;
    const erc20Contract = TOKEN_REGISTRY[token].contract[chain];
    try {
      if (!erc20Contract) throw new CustomError("ERC20コントラクトが取得できませんでした。");

      const balance = await erc20Contract.read.balanceOf([wallet]);
      return toDisplyValueStr(balance, token);
    } catch (error: unknown) {
      console.warn(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーにより ${token} の残高取得に失敗しました。`);
    }
  },

  async transferToken(
    chain: Chain,
    command: TransferTokenCommand,
    quotesGateway: IQuotesGateway,
    tokenGateway: ITokensGateway
  ): Promise<Hex> {
    const { account, client, token, feeToken, recipient, amountDisplayValue, webhookUrl } = command;

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
      amountMinUnits: toMinUnits(amountDisplayValue, token)
    };
    try {
      const publicClient = VIEM_PUBLIC_CLIENTS[chain];
      const { delegate, quoteToken } = await quotesGateway.create(createQuoteQuery);

      const nonce = await publicClient.getTransactionCount({
        address: account.address,
        blockTag: "pending"
      });
      const authorization = await client.signAuthorization({
        account,
        contractAddress: delegate,
        chainId: CHAINS[chain].id,
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
      const { txHash } = await tokenGateway.transfer(transferTokenQuery);

      return txHash;
    } catch (error: unknown) {
      console.error(error);

      let mes = "送金処理中に不明なエラーが発生しました。";
      if (error instanceof ApiError) {
        const body = error.body as ShackwApiErrorBody;
        const code = body.errors[0].code;

        if (code === "BAD_REQUEST") mes = "リクエスト内容が不正です。";
        if (code.includes("INSUFFICIENT")) mes = "残高が不足しています。";
        throw new Error(mes);
      }
      throw new Error(`${mes}: ${String(error)}`);
    }
  }
};
