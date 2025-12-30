export type LayoutMode = "xs" | "sm" | "md" | "lg";

export const getLayoutMode = (w: number): LayoutMode => {
  if (w < 360) return "xs";
  if (w < 390) return "sm";
  if (w < 430) return "md";
  return "lg";
};

export const TW_SPACE = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64,
  72, 80, 96
] as const;

export type TwSpace = (typeof TW_SPACE)[number];

export const DENSITY = {
  xs: {
    spaceScale: 0.84,
    numScale: 0.88,
    textShift: -2,
    inputShift: -2
  },
  sm: {
    spaceScale: 0.9,
    numScale: 0.93,
    textShift: -1,
    inputShift: -1
  },
  md: {
    spaceScale: 1.0,
    numScale: 1.0,
    textShift: 0,
    inputShift: 0
  },
  lg: {
    spaceScale: 1.06,
    numScale: 1.05,
    textShift: +1,
    inputShift: 0
  }
} as const satisfies Record<
  LayoutMode,
  { spaceScale: number; numScale: number; textShift: number; inputShift: number }
>;

export const TEXT_SCALE_ORDER = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
export type TextToken = (typeof TEXT_SCALE_ORDER)[number];

export const INPUT_SCALE_ORDER = ["sm", "md", "lg", "xl"] as const;
export type InputToken = (typeof INPUT_SCALE_ORDER)[number];

export const INPUT_SCALE_ORDER_NO_XL = ["sm", "md", "lg"] as const;
export type InputTokenNoXl = (typeof INPUT_SCALE_ORDER_NO_XL)[number];
