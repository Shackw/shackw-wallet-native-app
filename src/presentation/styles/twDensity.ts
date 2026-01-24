import type { InputToken, InputTokenNoXl, LayoutMode, TextToken, TwSpace } from "@/presentation/styles/density";
import {
  DENSITY,
  INPUT_SCALE_ORDER,
  INPUT_SCALE_ORDER_NO_XL,
  TEXT_SCALE_ORDER,
  TW_SPACE
} from "@/presentation/styles/density";

// ---------- internal utils ----------
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const nearestTwSpace = (n: number): TwSpace => {
  let best: TwSpace = TW_SPACE[0];
  let bestDiff = Math.abs(n - best);

  for (const x of TW_SPACE) {
    const d = Math.abs(n - x);
    if (d < bestDiff) {
      best = x;
      bestDiff = d;
    }
  }
  return best;
};

const twNumToClass = (prefix: string, n: TwSpace) => {
  return `${prefix}-${String(n)}`;
};

const scaleSpace = (mode: LayoutMode, base: number) => {
  const s = DENSITY[mode].spaceScale;
  const scaled = base * s;
  return nearestTwSpace(scaled);
};

const shiftTextToken = (mode: LayoutMode, token: TextToken): TextToken => {
  const shift = DENSITY[mode].textShift;
  const idx = TEXT_SCALE_ORDER.indexOf(token);
  const next = clamp(idx + shift, 0, TEXT_SCALE_ORDER.length - 1);
  return TEXT_SCALE_ORDER[next]!;
};

const shiftInputToken = (mode: LayoutMode, token: InputToken): InputToken => {
  const shift = DENSITY[mode].inputShift;
  const idx = INPUT_SCALE_ORDER.indexOf(token);
  const next = clamp(idx + shift, 0, INPUT_SCALE_ORDER.length - 1);
  return INPUT_SCALE_ORDER[next]!;
};

const shiftInputTokenNoXl = (mode: LayoutMode, token: InputTokenNoXl): InputTokenNoXl => {
  const shift = DENSITY[mode].inputShift;
  const idx = INPUT_SCALE_ORDER_NO_XL.indexOf(token);
  const next = clamp(idx + shift, 0, INPUT_SCALE_ORDER_NO_XL.length - 1);
  return INPUT_SCALE_ORDER_NO_XL[next]!;
};

const textClass = (token: TextToken) => {
  return token === "2xl" ? "text-2xl" : `text-${token}`;
};

// ---------- exported: spacing ----------
export const p = (mode: LayoutMode, n: number) => twNumToClass("p", scaleSpace(mode, n));
export const px = (mode: LayoutMode, n: number) => twNumToClass("px", scaleSpace(mode, n));
export const py = (mode: LayoutMode, n: number) => twNumToClass("py", scaleSpace(mode, n));
export const pt = (mode: LayoutMode, n: number) => twNumToClass("pt", scaleSpace(mode, n));
export const pb = (mode: LayoutMode, n: number) => twNumToClass("pb", scaleSpace(mode, n));
export const pl = (mode: LayoutMode, n: number) => twNumToClass("pl", scaleSpace(mode, n));
export const pr = (mode: LayoutMode, n: number) => twNumToClass("pr", scaleSpace(mode, n));

export const m = (mode: LayoutMode, n: number) => twNumToClass("m", scaleSpace(mode, n));
export const mx = (mode: LayoutMode, n: number) => twNumToClass("mx", scaleSpace(mode, n));
export const my = (mode: LayoutMode, n: number) => twNumToClass("my", scaleSpace(mode, n));
export const mt = (mode: LayoutMode, n: number) => twNumToClass("mt", scaleSpace(mode, n));
export const mb = (mode: LayoutMode, n: number) => twNumToClass("mb", scaleSpace(mode, n));
export const ml = (mode: LayoutMode, n: number) => twNumToClass("ml", scaleSpace(mode, n));
export const mr = (mode: LayoutMode, n: number) => twNumToClass("mr", scaleSpace(mode, n));

export const gap = (mode: LayoutMode, n: number) => twNumToClass("gap", scaleSpace(mode, n));
export const gapX = (mode: LayoutMode, n: number) => twNumToClass("gap-x", scaleSpace(mode, n));
export const gapY = (mode: LayoutMode, n: number) => twNumToClass("gap-y", scaleSpace(mode, n));

export const w = (mode: LayoutMode, n: number) => twNumToClass("w", scaleSpace(mode, n));
export const h = (mode: LayoutMode, n: number) => twNumToClass("h", scaleSpace(mode, n));
export const minW = (mode: LayoutMode, n: number) => twNumToClass("min-w", scaleSpace(mode, n));
export const maxW = (mode: LayoutMode, n: number) => twNumToClass("max-w", scaleSpace(mode, n));
export const minH = (mode: LayoutMode, n: number) => twNumToClass("min-h", scaleSpace(mode, n));
export const maxH = (mode: LayoutMode, n: number) => twNumToClass("max-h", scaleSpace(mode, n));

export const text = (mode: LayoutMode, token: TextToken) => textClass(shiftTextToken(mode, token));

export const input = (mode: LayoutMode, token: InputToken) => shiftInputToken(mode, token);

export const inputNoXl = (mode: LayoutMode, token: InputTokenNoXl) => shiftInputTokenNoXl(mode, token);
