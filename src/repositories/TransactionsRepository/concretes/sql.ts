import type { TransactionProgressRow, TransactionWithAddressRow } from "@/db/schema";
import { TOKEN_REGISTRY } from "@/registries/TokenRegistry";

import { transactionProgressRowToResult, transactionWithAddressRowToResult } from "../mapper";

import type {
  SearchTransactionQuery,
  ResolvedTransactionResult,
  ILocalTransactionsRepository,
  GetTransactionProgressQuery,
  TransactionProgressResult,
  TransactionResult
} from "../interface";
import type { SQLiteDatabase } from "expo-sqlite";

export const SqlTransactionsRepository: ILocalTransactionsRepository = {
  async search(db: SQLiteDatabase, query: SearchTransactionQuery): Promise<ResolvedTransactionResult[]> {
    const { chain, wallet, tokens, timeFrom, timeTo, limit, direction } = query;

    const tokenAddrs = tokens.map(t => TOKEN_REGISTRY[t.symbol].address.toLowerCase());
    const inPlaceholders = tokenAddrs.map((_, i) => `$t${i}`).join(",");

    const cond: string[] = [`t.token_address IN (${inPlaceholders})`];
    const bind: Record<string, string | number> = {};
    tokenAddrs.forEach((a, i) => (bind[`$t${i}`] = a));

    cond.push(`t.chain = $chain`);
    bind.$chain = chain;

    if (timeFrom) {
      cond.push(`t.transferred_at >= $from`);
      bind.$from = Math.floor(timeFrom.getTime() / 1000);
    }
    if (timeTo) {
      cond.push(`t.transferred_at <= $to`);
      bind.$to = Math.floor(timeTo.getTime() / 1000);
    }

    const me = wallet.toLowerCase();
    if (direction === "in") cond.push(`t.to_address = $me`);

    if (direction === "out") cond.push(`t.from_address = $me`);

    if (direction === "both") cond.push(`(t.from_address = $me OR t.to_address = $me)`);

    if (direction && direction !== "both") bind.$me = me;

    if (direction === "both") bind.$me = me;

    const limitSql = limit ? `LIMIT $limit` : "";
    if (limit) bind.$limit = limit;

    const stmt = await db.prepareAsync(`
      SELECT t.tx_hash,
            t.log_index,
            t.block_number,
            t.token_address,
            t.from_address,
            t.to_address,
            t.value_min_units,
            t.transferred_at,
            CASE WHEN fa.is_mine = 1 THEN '自分' ELSE fa.name END AS from_name,
            CASE WHEN ta.is_mine = 1 THEN '自分' ELSE ta.name END AS to_name
      FROM transactions AS t
        LEFT JOIN addresses AS fa ON fa.address = t.from_address
        LEFT JOIN addresses AS ta ON ta.address = t.to_address
      WHERE ${cond.join(" AND ")}
      ORDER BY t.transferred_at DESC, CAST(t.block_number AS INTEGER) DESC, t.log_index DESC
      ${limitSql};
    `);
    try {
      const res = await stmt.executeAsync<TransactionWithAddressRow>(bind);
      const rows = await res.getAllAsync();
      return rows.map(transactionWithAddressRowToResult);
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async batchWrite(db: SQLiteDatabase, progress: TransactionProgressResult, rows: TransactionResult[]): Promise<void> {
    const { chain, year, month, status, token, createdBy, lastUpdatedAt } = progress;
    const tokenAddress = TOKEN_REGISTRY[token].address.toLowerCase();

    await db.withExclusiveTransactionAsync(async txn => {
      const transactionsStmt = await txn.prepareAsync(`
        INSERT OR IGNORE INTO transactions (
          chain,
          tx_hash,
          log_index,
          block_number,
          token_address,
          from_address,
          to_address,
          value_min_units,
          transferred_at
        )
        VALUES (
          $chain,
          $txHash,
          $logIndex,
          $blockNumber,
          $tokenAddress,
          $fromAddress,
          $toAddress,
          $valueMinUnits,
          $transferredAt
        )
      `);

      const progressStmt = await txn.prepareAsync(`
        INSERT INTO transaction_progress (
          chain,
          year,
          month,
          token_address,
          created_by_address,
          status,
          last_updated_at
        )
        VALUES (
          $chain,
          $year,
          $month,
          $tokenAddress,
          $createdBy,
          $status,
          $lastUpdatedAt
        )
        ON CONFLICT(year, month, token_address)
        DO UPDATE SET
          status = excluded.status,
          last_updated_at = excluded.last_updated_at
      `);

      try {
        for (const r of rows) {
          await transactionsStmt.executeAsync({
            $chain: chain,
            $txHash: r.txHash.toLowerCase(),
            $logIndex: r.logIndex,
            $blockNumber: r.blockNumber.toString(),
            $tokenAddress: r.tokenAddress.toLowerCase(),
            $fromAddress: r.fromAddress.toLowerCase(),
            $toAddress: r.toAddress.toLowerCase(),
            $valueMinUnits: r.valueMinUnits.toString(),
            $transferredAt: r.transferredUnixAt
          });
        }
        await progressStmt.executeAsync({
          $chain: chain,
          $year: year,
          $month: month,
          $tokenAddress: tokenAddress,
          $createdBy: createdBy,
          $status: status,
          $lastUpdatedAt: Math.floor(lastUpdatedAt.getTime() / 1000)
        });
      } finally {
        await transactionsStmt.finalizeAsync();
        await progressStmt.finalizeAsync();
      }
    });
  },

  async getProgress(db: SQLiteDatabase, query: GetTransactionProgressQuery): Promise<TransactionProgressResult | null> {
    const { chain, wallet, year, month, token } = query;
    const tokenAddress = TOKEN_REGISTRY[token.symbol].address.toLowerCase();

    const stmt = await db.prepareAsync(`
      SELECT
        chain,
        year,
        month,
        token_address,
        created_by_address,
        status,
        last_updated_at
      FROM transaction_progress
      WHERE
        chain = $chain
        AND year = $year
        AND month = $month
        AND token_address = $tokenAddress
        AND created_by_address = $createdBy
    `);

    try {
      const result = await stmt.executeAsync<TransactionProgressRow>({
        $chain: chain,
        $year: year,
        $month: month,
        $tokenAddress: tokenAddress,
        $createdBy: wallet
      });
      const row = await result.getFirstAsync();
      if (!row) return null;
      return transactionProgressRowToResult(row);
    } finally {
      await stmt.finalizeAsync();
    }
  }
};
