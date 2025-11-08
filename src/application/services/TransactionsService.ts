import { endOfMonth, isAfter, isEqual } from "date-fns";

import { RpcTransactionsRepository } from "../../infrastructure/rpc/RpcTransactionsRepository";
import { SqlTransactionsRepository } from "../../infrastructure/sql/SqlTransactionsRepository";

import type {
  GetTransactionProgressQuery,
  TransactionProgressResult,
  SearchTransactionQuery,
  ResolvedTransactionResult
} from "../ports/ITransactionsRepository";
import type { SQLiteDatabase } from "expo-sqlite";

export const TransactionsService = {
  async search(db: SQLiteDatabase, query: SearchTransactionQuery): Promise<ResolvedTransactionResult[]> {
    const { chain, wallet, timeTo, timeFrom, tokens } = query;

    if (isAfter(timeFrom, new Date())) throw new Error("timeFrom は現在時刻以前で指定する必要があります。");

    if (tokens.length === 0) throw new Error("tokens を1つ以上指定してください。");

    const toYear = timeTo && timeTo.getFullYear();
    const toMonth = timeTo && timeTo.getMonth() + 1;

    const fromYear = timeFrom && timeFrom.getFullYear();
    const fromMonth = timeFrom && timeFrom.getMonth() + 1;

    const usedLocal = (toYear === fromYear && toMonth === fromMonth) || tokens.length === 1;
    if (!usedLocal) return await RpcTransactionsRepository.search(query);

    const progress = await SqlTransactionsRepository.getProgress(db, {
      chain,
      year: toYear,
      month: toMonth,
      token: tokens[0],
      wallet
    });

    if (progress?.status !== "completed") {
      const remoteQuery: SearchTransactionQuery = {
        ...query,
        timeFrom: progress ? progress.lastUpdatedAt : timeFrom
      };
      const searchedRemote = await RpcTransactionsRepository.search(remoteQuery);

      const newProgress: TransactionProgressResult = {
        chain,
        year: toYear,
        month: toMonth,
        token: tokens[0].symbol,
        createdBy: wallet,
        status: isEqual(timeTo, endOfMonth(timeTo)) ? "completed" : "partial",
        lastUpdatedAt: timeTo
      };
      await SqlTransactionsRepository.batchWrite(db, newProgress, searchedRemote);
      return await SqlTransactionsRepository.search(db, query);
    }

    return await SqlTransactionsRepository.search(db, query);
  },

  async getProgress(db: SQLiteDatabase, query: GetTransactionProgressQuery): Promise<TransactionProgressResult | null> {
    return await SqlTransactionsRepository.getProgress(db, query);
  }
};
