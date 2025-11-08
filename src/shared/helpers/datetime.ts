import { formatInTimeZone } from "date-fns-tz";

export const formatIsoString = (date: Date) => formatInTimeZone(date, "Asia/Tokyo", "yyyy-MM-dd HH:mm");

export const toUnixSec = (input: Date): number => {
  return Math.floor(input.getTime() / 1000);
};
