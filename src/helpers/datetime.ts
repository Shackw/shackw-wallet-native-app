import { formatInTimeZone } from "date-fns-tz";

export const formatUnixTimestamp = (
  ts: number,
  tz: string = "Asia/Tokyo",
  fmt: string = "yyyy-MM-dd HH:mm"
): string => {
  const ms = ts < 1e12 ? ts * 1000 : ts;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "-";
  return formatInTimeZone(d, tz, fmt);
};

export const formatUnixTimestampToJST = (ts: number, fmt?: string) =>
  formatUnixTimestamp(ts, "Asia/Tokyo", fmt ?? "yyyy-MM-dd HH:mm");

export const toUnixSec = (input: Date): number => {
  return Math.floor(input.getTime() / 1000);
};
