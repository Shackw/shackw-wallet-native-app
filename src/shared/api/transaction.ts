import { subMonths } from "date-fns";
import { parseAbiItem } from "viem";

import { TOKEN_TO_ADDRESS_MAP } from "../config/contracts";
import { VIEM_PUBLIC_CLIENT } from "../config/viem";
import { Erc20Transfer } from "../types/erc20";
import { blockNumberByTimestamp } from "../utils/block";
import { toUnixSec } from "../utils/datetime";

import type { TokenKind } from "../domain/tokens/registry";
import type { Address, PublicClient } from "viem";

type SearchTransactionPayload = {
  walletAddress: Address;
  tokens: TokenKind[];
  timeFrom?: Date;
  timeTo?: Date;
  limit?: number;
  chunkSize?: bigint;
  direction?: "in" | "out" | "both";
};

const transferEvt = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)");

const blockTsCache = new Map<bigint, number>();

const CONCURRENCY = 6;
const DEFAULT_CHUNK = 10_000n;

export const searchTransaction = async (
  {
    tokens,
    walletAddress,
    timeFrom,
    timeTo,
    limit,
    chunkSize = DEFAULT_CHUNK,
    direction = "both"
  }: SearchTransactionPayload,
  client: PublicClient = VIEM_PUBLIC_CLIENT
): Promise<Erc20Transfer[]> => {
  const latest = await client.getBlockNumber();
  const fromBlock = timeFrom ? await blockNumberByTimestamp(client, toUnixSec(timeFrom), "gte") : 0n;
  const toBlock = timeTo ? await blockNumberByTimestamp(client, toUnixSec(timeTo), "lte") : latest;

  if (fromBlock > toBlock) return [];

  const tokenAddrs = [...new Set(tokens.map(t => TOKEN_TO_ADDRESS_MAP[t]))];
  if (tokenAddrs.length === 0) return [];

  const ranges: { from: bigint; to: bigint }[] = [];
  for (let to = toBlock; to >= fromBlock; ) {
    const from = to - chunkSize + 1n > fromBlock ? to - chunkSize + 1n : fromBlock;
    ranges.push({ from, to });
    if (from === fromBlock) break;
    to = from - 1n;
  }

  const want = limit ?? Number.POSITIVE_INFINITY;
  const results: Erc20Transfer[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < ranges.length && results.length < want; i += CONCURRENCY) {
    const slice = ranges.slice(i, i + CONCURRENCY);

    const perRange = await Promise.all(
      slice.map(async r => {
        const q: Promise<readonly any[]>[] = [];
        if (direction === "both" || direction === "in") {
          q.push(
            client.getLogs({
              address: tokenAddrs,
              event: transferEvt,
              args: { to: walletAddress },
              fromBlock: r.from,
              toBlock: r.to
            })
          );
        }
        if (direction === "both" || direction === "out") {
          q.push(
            client.getLogs({
              address: tokenAddrs,
              event: transferEvt,
              args: { from: walletAddress },
              fromBlock: r.from,
              toBlock: r.to
            })
          );
        }
        const logs = (await Promise.all(q)).flat();
        if (logs.length === 0) return [] as Erc20Transfer[];

        const uniqBns = [...new Set(logs.map(l => l.blockNumber! as bigint))];
        await Promise.all(
          uniqBns.map(async bn => {
            if (!blockTsCache.has(bn)) {
              const b = await client.getBlock({ blockNumber: bn });
              blockTsCache.set(bn, Number(b.timestamp));
            }
          })
        );

        logs.sort((a, b) => {
          const ab = a.blockNumber! as bigint;
          const bb = b.blockNumber! as bigint;
          return ab === bb ? b.logIndex - a.logIndex : ab < bb ? 1 : -1;
        });

        const items: Erc20Transfer[] = [];
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
};

export const getLastTransaction = async (walletAddress: Address): Promise<Erc20Transfer | null> => {
  try {
    const payload: SearchTransactionPayload = {
      walletAddress,
      timeFrom: subMonths(new Date(), 3),
      tokens: ["JPYC", "USDC", "EURC"],
      limit: 1
    };
    const searched = await searchTransaction(payload);
    return searched[0] ?? null;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`getLastTransaction error: ${error.message}`, { cause: error });
    }
    throw new Error(`getLastTransaction unknown error: ${String(error)}`);
  }
};
