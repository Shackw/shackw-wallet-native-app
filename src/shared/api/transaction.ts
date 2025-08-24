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

export const searchTransaction = async (
  { tokens, walletAddress, timeFrom, timeTo, limit, chunkSize = 10_000n, direction = "both" }: SearchTransactionPayload,
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

  const results: Erc20Transfer[] = [];
  const want = limit ?? Number.POSITIVE_INFINITY;
  const seen = new Set<string>();

  for (const r of ranges) {
    const queries = [];

    if (direction === "both" || direction === "in") {
      queries.push(
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
      queries.push(
        client.getLogs({
          address: tokenAddrs,
          event: transferEvt,
          args: { from: walletAddress },
          fromBlock: r.from,
          toBlock: r.to
        })
      );
    }

    const logs = (await Promise.all(queries)).flat();
    if (logs.length === 0) continue;

    const uniqBlocks = [...new Set(logs.map(l => l.blockNumber!.toString()))].map(s => BigInt(s));
    const blockMap = new Map<bigint, number>();
    await Promise.all(
      uniqBlocks.map(async bn => {
        const b = await client.getBlock({ blockNumber: bn });
        blockMap.set(bn, Number(b.timestamp));
      })
    );

    for (const l of logs) {
      if (!l.blockNumber || l.transactionHash == null) continue;
      const key = `${l.transactionHash}:${l.logIndex ?? 0}`;
      if (seen.has(key)) continue;
      seen.add(key);

      results.push({
        txHash: l.transactionHash!,
        blockNumber: l.blockNumber!,
        logIndex: l.logIndex ?? 0,
        token: l.address as Address,
        from: l.args.from as Address,
        to: l.args.to as Address,
        value: l.args.value as bigint,
        timestamp: blockMap.get(l.blockNumber!)!
      });
    }

    results.sort((a, b) =>
      a.blockNumber === b.blockNumber ? b.logIndex - a.logIndex : Number(b.blockNumber - a.blockNumber)
    );
    if (results.length >= want) return results.slice(0, want);
  }

  return results.slice(0, want);
};

export const getLastTransaction = async (walletAddress: Address): Promise<Erc20Transfer | null> => {
  try {
    const payload: SearchTransactionPayload = {
      walletAddress,
      tokens: ["JPYC", "USDC", "EURC"],
      limit: 1
    };
    const searched = await searchTransaction(payload);
    return searched[0] ?? null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`getLastTransaction error: ${error.message}`, { cause: error });
    }
    throw new Error(`getLastTransaction unknown error: ${String(error)}`);
  }
};
