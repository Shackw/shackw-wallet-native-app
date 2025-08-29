import { Address, parseAbiItem } from "viem";

import { TOKEN_TO_ADDRESS_MAP } from "@/configs/contract";
import { VIEM_PUBLIC_CLIENT } from "@/configs/viem";
import { TransactionModel } from "@/models/transaction";
import { blockNumberByTimestamp } from "@/utils/block";
import { toUnixSec } from "@/utils/datetime";

import { SearchTransactionPayload } from "./interface";

const transferEvt = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)");
const blockTsCache = new Map<bigint, number>();

const CONCURRENCY = 6;
const DEFAULT_CHUNK = 10_000n;

export const TransactionsRepository = {
  async search(paylaod: SearchTransactionPayload): Promise<TransactionModel[]> {
    const { tokens, wallet, timeFrom, timeTo, limit, chunkSize = DEFAULT_CHUNK, direction = "both" } = paylaod;

    const latest = await VIEM_PUBLIC_CLIENT.getBlockNumber();
    const fromBlock = timeFrom ? await blockNumberByTimestamp(VIEM_PUBLIC_CLIENT, toUnixSec(timeFrom), "gte") : 0n;
    const toBlock = timeTo ? await blockNumberByTimestamp(VIEM_PUBLIC_CLIENT, toUnixSec(timeTo), "lte") : latest;

    if (fromBlock > toBlock) return [];

    const tokenAddrs = [...new Set(tokens.map(t => TOKEN_TO_ADDRESS_MAP[t.symbol]))];
    if (tokenAddrs.length === 0) return [];

    const ranges: { from: bigint; to: bigint }[] = [];
    for (let to = toBlock; to >= fromBlock; ) {
      const from = to - chunkSize + 1n > fromBlock ? to - chunkSize + 1n : fromBlock;
      ranges.push({ from, to });
      if (from === fromBlock) break;
      to = from - 1n;
    }

    const want = limit ?? Number.POSITIVE_INFINITY;
    const results: TransactionModel[] = [];
    const seen = new Set<string>();

    for (let i = 0; i < ranges.length && results.length < want; i += CONCURRENCY) {
      const slice = ranges.slice(i, i + CONCURRENCY);

      const perRange = await Promise.all(
        slice.map(async r => {
          const q: Promise<readonly any[]>[] = [];
          if (direction === "both" || direction === "in") {
            q.push(
              VIEM_PUBLIC_CLIENT.getLogs({
                address: tokenAddrs,
                event: transferEvt,
                args: { to: wallet },
                fromBlock: r.from,
                toBlock: r.to
              })
            );
          }
          if (direction === "both" || direction === "out") {
            q.push(
              VIEM_PUBLIC_CLIENT.getLogs({
                address: tokenAddrs,
                event: transferEvt,
                args: { from: wallet },
                fromBlock: r.from,
                toBlock: r.to
              })
            );
          }
          const logs = (await Promise.all(q)).flat();
          if (logs.length === 0) return [] as TransactionModel[];

          const uniqBns = [...new Set(logs.map(l => l.blockNumber! as bigint))];
          await Promise.all(
            uniqBns.map(async bn => {
              if (!blockTsCache.has(bn)) {
                const b = await VIEM_PUBLIC_CLIENT.getBlock({ blockNumber: bn });
                blockTsCache.set(bn, Number(b.timestamp));
              }
            })
          );

          logs.sort((a, b) => {
            const ab = a.blockNumber! as bigint;
            const bb = b.blockNumber! as bigint;
            return ab === bb ? b.logIndex - a.logIndex : ab < bb ? 1 : -1;
          });

          const items: TransactionModel[] = [];
          for (const l of logs) {
            if (!l.blockNumber || !l.transactionHash) continue;
            items.push({
              txHash: l.transactionHash!,
              blockNumber: l.blockNumber!,
              logIndex: l.logIndex ?? 0,
              token: l.address as Address,
              from: l.args.from as Address,
              to: l.args.to as Address,
              value: l.args.value as bigint,
              timestamp: blockTsCache.get(l.blockNumber!)!
            });
          }
          return items;
        })
      );

      for (const items of perRange) {
        for (const it of items) {
          const key = `${it.txHash}:${it.logIndex}`;
          if (seen.has(key)) continue;
          seen.add(key);
          results.push(it);
          if (results.length >= want) break;
        }
        if (results.length >= want) break;
      }
    }

    results.sort((a, b) =>
      a.blockNumber === b.blockNumber ? b.logIndex - a.logIndex : Number(b.blockNumber - a.blockNumber)
    );
    return results.slice(0, want);
  }
};
