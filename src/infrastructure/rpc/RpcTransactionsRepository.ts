import { Address, parseAbiItem } from "viem";

import { RPC_TUNIGS } from "@/config/rpcTuning";
import { VIEM_PUBLIC_CLIENTS } from "@/config/viem";
import { TOKEN_REGISTRY } from "@/registries/ChainTokenRegistry";
import { blockNumberByTimestamp } from "@/shared/helpers/block";
import { toUnixSec } from "@/shared/helpers/datetime";

import type {
  SearchTransactionQuery,
  ResolvedTransactionResult,
  IRemoteTransactionsRepository
} from "../../application/ports/ITransactionsRepository";

const transferEvt = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)");
const blockTsCache = new Map<bigint, number>();

export const RpcTransactionsRepository: IRemoteTransactionsRepository = {
  async search(payload: SearchTransactionQuery): Promise<ResolvedTransactionResult[]> {
    const { chain, tokens, wallet, timeFrom, timeTo, limit, direction = "both" } = payload;
    const publicClient = VIEM_PUBLIC_CLIENTS[chain];

    const latest = await publicClient.getBlockNumber();
    const fromBlock = timeFrom ? await blockNumberByTimestamp(publicClient, toUnixSec(timeFrom), "gte") : 0n;
    const toBlock = timeTo ? await blockNumberByTimestamp(publicClient, toUnixSec(timeTo), "lte") : latest;
    if (fromBlock > toBlock) return [];

    const tokenAddrs: Address[] = (() => {
      const m = new Map<string, Address>();
      for (const t of tokens) {
        const addr = TOKEN_REGISTRY[t.symbol].address[chain] as Address;
        if (!m.has(addr)) m.set(addr, addr);
      }
      return [...m.values()];
    })();
    if (tokenAddrs.length === 0) return [];

    const ranges: { from: bigint; to: bigint }[] = [];
    for (let to = toBlock; to >= fromBlock; ) {
      const from =
        to - RPC_TUNIGS[chain].chunkSize + 1n > fromBlock ? to - RPC_TUNIGS[chain].chunkSize + 1n : fromBlock;
      ranges.push({ from, to });
      if (from === fromBlock) break;
      to = from - 1n;
    }

    const want = limit ?? Number.POSITIVE_INFINITY;
    const results: ResolvedTransactionResult[] = [];
    const seen = new Set<string>();

    for (let i = 0; i < ranges.length && results.length < want; i += RPC_TUNIGS[chain].concurrency) {
      const slice = ranges.slice(i, i + RPC_TUNIGS[chain].concurrency);

      const perRange = await Promise.all(
        slice.map(async r => {
          const qs: Promise<readonly any[]>[] = [];
          if (direction !== "out") {
            qs.push(
              publicClient
                .getLogs({
                  address: tokenAddrs,
                  event: transferEvt,
                  args: { to: wallet },
                  fromBlock: r.from,
                  toBlock: r.to
                })
                .catch(() => [])
            );
          }
          if (direction !== "in") {
            qs.push(
              publicClient
                .getLogs({
                  address: tokenAddrs,
                  event: transferEvt,
                  args: { from: wallet },
                  fromBlock: r.from,
                  toBlock: r.to
                })
                .catch(() => [])
            );
          }
          const logs = (await Promise.all(qs)).flat();
          if (logs.length === 0) return [] as ResolvedTransactionResult[];

          logs.sort((a, b) => {
            const ab = a.blockNumber as bigint,
              bb = b.blockNumber as bigint;
            return ab === bb ? b.logIndex - a.logIndex : ab < bb ? 1 : -1;
          });

          const need = want - results.length;
          const picked = need === Number.POSITIVE_INFINITY ? logs : logs.slice(0, Math.max(need, 0));

          const uniqNeededBns: bigint[] = (() => {
            const s = new Set<bigint>();
            for (const l of picked) s.add(l.blockNumber as bigint);
            return [...s];
          })();

          await Promise.all(
            uniqNeededBns.map(async bn => {
              if (!blockTsCache.has(bn)) {
                const b = await publicClient.getBlock({ blockNumber: bn });
                blockTsCache.set(bn, Number(b.timestamp));
              }
            })
          );

          const items: ResolvedTransactionResult[] = [];
          for (const l of picked) {
            const bn = l.blockNumber as bigint;
            const ts = blockTsCache.get(bn);
            if (ts == null || !l.transactionHash) continue;
            items.push({
              txHash: l.transactionHash,
              blockNumber: bn,
              logIndex: l.logIndex ?? 0,
              tokenAddress: l.address as Address,
              fromAddress: l.args.from as Address,
              toAddress: l.args.to as Address,
              valueMinUnits: l.args.value as bigint,
              transferredUnixAt: ts
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
      a.blockNumber === b.blockNumber ? b.logIndex - a.logIndex : a.blockNumber < b.blockNumber ? 1 : -1
    );
    return want === Number.POSITIVE_INFINITY ? results : results.slice(0, want);
  }
};
