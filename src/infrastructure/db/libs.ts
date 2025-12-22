import { sleep } from "@/shared/helpers/sleep";

function isBusyError(e: unknown): boolean {
  const msg = String((e as any)?.message ?? "").toLowerCase();
  return msg.includes("database is locked") || msg.includes("sqlite_busy") || msg.includes("database is busy");
}

function isRetryableSqliteError(err: unknown): boolean {
  const msg = String((err as any)?.message ?? "").toLowerCase();
  return (
    msg.includes("database is locked") ||
    msg.includes("sqlite_busy") ||
    msg.includes("database is busy") ||
    msg.includes("sqlite_ioerr")
  );
}

export async function withBusyRetry<T>(
  fn: () => Promise<T>,
  {
    maxRetries = 5,
    baseDelayMs = 100,
    maxDelayMs = 2000
  }: { maxRetries?: number; baseDelayMs?: number; maxDelayMs?: number } = {}
): Promise<T> {
  let attempt = 0;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (!isBusyError(err) || attempt >= maxRetries) throw err;

      const delay = Math.min(baseDelayMs * 2 ** attempt + Math.random() * 100, maxDelayMs);
      console.warn(`SQLite BUSY (${attempt + 1}/${maxRetries}) → retrying after ${delay}ms`);
      await sleep(delay);
      attempt++;
    }
  }
}

export const chunk = <T>(xs: T[], size: number) =>
  Array.from({ length: Math.ceil(xs.length / size) }, (_, i) => xs.slice(i * size, (i + 1) * size));

export async function execWithRetry<T>(
  fn: () => Promise<T>,
  opts: {
    maxRetries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    onRetry?: (err: unknown, attempt: number, delayMs: number) => void;
  } = {}
): Promise<T> {
  const { maxRetries = 5, baseDelayMs = 100, maxDelayMs = 2000, onRetry } = opts;
  let attempt = 0;

  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (!isRetryableSqliteError(err) || attempt >= maxRetries) throw err;

      const delay = Math.min(baseDelayMs * 2 ** attempt + Math.random() * 100, maxDelayMs);
      onRetry?.(err, attempt + 1, delay);
      await sleep(delay);
      attempt++;
    }
  }
}
