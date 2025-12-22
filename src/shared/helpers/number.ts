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

export const randInt = (min: number, max: number): number => {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  if (hi < lo) throw new Error("max must be >= min");
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
};
