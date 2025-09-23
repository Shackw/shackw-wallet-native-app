import { endOfMonth, isAfter, isEqual } from "date-fns";

import { RpcTransactionsRepository } from "./concretes/rpc";
import { SqlTransactionsRepository } from "./concretes/sql";

import type {
  GetTransactionProgressQuery,
  TransactionProgressResult,
  ITransactionsRepository,
  SearchTransactionQuery,
  ResolvedTransactionResult
} from "./interface";
import type { SQLiteDatabase } from "expo-sqlite";

export const TransactionsRepository: ITransactionsRepository = {
  async search(db: SQLiteDatabase, query: SearchTransactionQuery): Promise<ResolvedTransactionResult[]> {
    const { timeTo, timeFrom } = query;

    if (!!timeFrom && isAfter(timeFrom, new Date()))
      throw new Error("timeFrom は現在時刻以前で指定する必要があります。");

    const toYear = timeTo && timeTo.getFullYear();
    const toMonth = timeTo && timeTo.getMonth() + 1;
    const isSpecifiedTo = !!timeTo && !!toYear && !!toMonth;

    const fromYear = timeFrom && timeFrom.getFullYear();
    const fromMonth = timeFrom && timeFrom.getMonth() + 1;
    const isSpecifiedFrom = !!timeFrom && !!fromYear && !!fromMonth;

    const usedLocal = isSpecifiedTo && isSpecifiedFrom && toYear === fromYear && toMonth === fromMonth;
    if (!usedLocal) return await RpcTransactionsRepository.search(query);

    const progress = await SqlTransactionsRepository.getProgress(db, {
      year: toYear,
      month: toMonth
    });

    if (progress?.status !== "completed") {
      const remoteQuery: SearchTransactionQuery = {
        ...query,
        timeFrom: progress ? progress.lastUpdatedAt : timeFrom
      };
      const searchedRemote = await RpcTransactionsRepository.search(remoteQuery);

      const newProgress: TransactionProgressResult = {
        year: toYear,
        month: toMonth,
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
