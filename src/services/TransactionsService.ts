import { subMonths } from "date-fns";
import { SQLiteDatabase } from "expo-sqlite";
import { Address } from "viem";

import { toDecimals } from "@/helpers/tokenUnits";
import { GetLastTransactionCommand, ListTransactionsByTermCommand, TransactionModel } from "@/models/transaction";
import { ADDRESS_TO_TOKEN, TOKENS } from "@/registries/TokenRegistry";
import { TransactionsRepository } from "@/repositories/TransactionsRepository";
import { ResolvedTransactionResult, SearchTransactionQuery } from "@/repositories/TransactionsRepository/interface";

export const TransactionsService = {
  async getLastTransaction(db: SQLiteDatabase, command: GetLastTransactionCommand): Promise<TransactionModel | null> {
    const { wallet } = command;
    const query: SearchTransactionQuery = {
      wallet,
      timeTo: new Date(),
      timeFrom: subMonths(new Date(), 3),
      tokens: [...TOKENS.map(token => ({ symbol: token }))],
      limit: 1
    };
    try {
      const searched = await TransactionsRepository.search(db, query);
      if (searched.length === 0) return null;
      return resultToModel(wallet, searched[0]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`最新の取引の取得に失敗しました: ${error.message}`, { cause: error });
      }
      throw new Error(`最新の取引の取得に失敗しました（不明なエラー）: ${String(error)}`);
    }
  },

  async listTransactionsByTerm(
    db: SQLiteDatabase,
    command: ListTransactionsByTermCommand
  ): Promise<TransactionModel[]> {
    const { wallet, token, timeFrom, timeTo } = command;
    const query: SearchTransactionQuery = {
      wallet,
      tokens: [{ symbol: token }],
      timeFrom,
      timeTo
    };
    try {
      const searched = await TransactionsRepository.search(db, query);
      const mapped = searched.map(v => resultToModel(wallet, v));
      return mapped;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`期間指定の取引一覧の取得に失敗しました: ${error.message}`, { cause: error });
      }
      throw new Error(`期間指定の取引一覧の取得に失敗しました（不明なエラー）: ${String(error)}`);
    }
  }
};

type TransferFlow = {
  direction: TransactionModel["direction"];
  counterparty: { address: Address; name?: string };
};
function resultToModel(wallet: Address, result: ResolvedTransactionResult): TransactionModel {
  const token = ADDRESS_TO_TOKEN[result.tokenAddress.toLowerCase()];

  const { direction, counterparty }: TransferFlow = (() => {
    const me = wallet.toLowerCase();
    const from = result.fromAddress.toLowerCase();
    const to = result.toAddress.toLowerCase();

    if (from === me && to !== me)
      return { direction: "out", counterparty: { address: result.toAddress, name: result.toName } };

    if (from !== me && to === me)
      return { direction: "in", counterparty: { address: result.fromAddress, name: result.fromName } };

    return { direction: "self", counterparty: { address: wallet, name: result.toName } };
  })();

  return {
    txHash: result.txHash,
    blockNumber: result.blockNumber,
    logIndex: result.logIndex,
    token,
    direction,
    value: {
      minUnits: result.valueMinUnits,
      decimals: toDecimals(result.valueMinUnits, token)
    },
    counterparty,
    transferredAt: new Date(result.transferredUnixAt * 1000)
  };
}
