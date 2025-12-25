type CnArg = string | number | null | undefined | false | CnArg[] | Record<string, any>;

export const cn = (...args: CnArg[]): string => {
  const out: string[] = [];

  const walk = (v: CnArg) => {
    if (!v) return;
    if (typeof v === "string" || typeof v === "number") {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      for (const x of v) walk(x as any);
      return;
    }
  };

  for (const a of args) walk(a);
  return out.join(" ");
};

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
