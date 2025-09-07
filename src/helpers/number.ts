export const isStrictDecimal = (value: string): boolean => {
  const t = value.trim();
  if (t === "") return false;
  return /^[+-]?\d+(\.\d+)?$/.test(t);
};

export const isConvertibleToNumber = (value: string): boolean => {
  const t = value.trim();
  if (t === "") return false;
  const n = Number(t);
  return Number.isFinite(n);
};

export const formatUpToN = (n: number, maxFrac: number, opts?: { locale?: string; useGrouping?: boolean }): string => {
  if (!Number.isFinite(n)) return "";
  const { locale = "ja-JP", useGrouping = false } = opts ?? {};
  if (Number.isInteger(n)) return String(n);
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: Math.max(0, maxFrac),
    minimumFractionDigits: 0,
    useGrouping
  }).format(n);
};
