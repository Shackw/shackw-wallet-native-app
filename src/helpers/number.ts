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
