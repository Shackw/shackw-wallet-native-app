import type { PublicClient } from "viem";

export async function blockNumberByTimestamp(
  client: PublicClient,
  tsSec: number,
  dir: "gte" | "lte" = "gte"
): Promise<bigint> {
  const latest = await client.getBlockNumber();

  const [earliestBlock, latestBlock] = await Promise.all([
    client.getBlock({ blockNumber: 0n }),
    client.getBlock({ blockNumber: latest })
  ]);
  const tsEarliest = Number(earliestBlock.timestamp);
  const tsLatest = Number(latestBlock.timestamp);

  if (tsSec <= tsEarliest) return dir === "gte" ? 0n : 0n;
  if (tsSec >= tsLatest) return dir === "gte" ? latest : latest;

  let lo = 0n;
  let hi = latest;

  const cache = new Map<bigint, number>();
  const getTs = async (n: bigint) => {
    const hit = cache.get(n);
    if (hit != null) return hit;
    const b = await client.getBlock({ blockNumber: n });
    const t = Number(b.timestamp);
    cache.set(n, t);
    return t;
  };

  while (lo <= hi) {
    const mid = (lo + hi) >> 1n;
    const bTs = await getTs(mid);
    if (bTs === tsSec) return mid;
    if (bTs < tsSec) lo = mid + 1n;
    else hi = mid - 1n;
  }
  return dir === "gte" ? lo : hi;
}
