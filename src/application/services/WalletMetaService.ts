import { Chain } from "@/config/chain";
import { WalletMetaModel, TokenMeta } from "@/domain/walletMeta";
import { Token } from "@/registries/TokenRegistry";
import { CustomError } from "@/shared/exceptions";

import { GetWalletSummaryResult, IWalletMetaRepository } from "../ports/IWalletMetaRepository";

const ensureTokenMeta = (
  acc: Partial<Record<Chain, Partial<Record<Token, TokenMeta>>>>,
  chain: Chain,
  token: Token
): TokenMeta => {
  if (!acc[chain]) acc[chain] = {};
  if (!acc[chain]![token]) {
    acc[chain]![token] = {
      minTransfer: { minUnits: 0n, display: 0 },
      fixedFee: { minUnits: 0n, display: 0 }
    };
  }
  return acc[chain]![token]!;
};

const buildWalletMetaModel = (meta: GetWalletSummaryResult): WalletMetaModel => {
  const result: Partial<Record<Chain, Partial<Record<Token, TokenMeta>>>> = {};

  // minTransfers -> minTransfer
  for (const entry of meta.minTransfers) {
    const chain = entry.chainSymbol as Chain;
    const token = entry.tokenSymbol as Token;

    const tokenMeta = ensureTokenMeta(result, chain, token);
    tokenMeta.minTransfer = {
      minUnits: BigInt(entry.minUnits),
      display: entry.display
    };
  }

  // fixedFees -> fixedFee
  for (const entry of meta.fixedFees) {
    const chain = entry.chainSymbol as Chain;
    const token = entry.tokenSymbol as Token;

    const tokenMeta = ensureTokenMeta(result, chain, token);
    tokenMeta.fixedFee = {
      minUnits: BigInt(entry.fixedFeeAmountUnits),
      display: entry.fixedFeeAmountDisplay
    };
  }

  return result as WalletMetaModel;
};

export const WalletMetaService = {
  async getSummary(walletMetaRepository: IWalletMetaRepository): Promise<WalletMetaModel> {
    try {
      const meta = await walletMetaRepository.get();

      return buildWalletMetaModel(meta);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error("不明なエラーによりウォレットメタ情報を取得できませんでした。");
    }
  }
};
