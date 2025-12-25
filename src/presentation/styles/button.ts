import { useMemo } from "react";

import { useDensity } from "@/presentation/hooks/useDensity";

import { LayoutMode } from "./density";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonStyleConfig = {
  minWClass: string;
  hClass: string;
  roundedClass: string;
  fontClass: string;
  pxClass: string;
  spinnerSize: number;
};

export const buttonSizeToStyleMap = {
  xs: {
    minWClass: "min-w-16",
    hClass: "h-8",
    roundedClass: "rounded-md",
    fontClass: "text-[0.6875rem]",
    pxClass: "px-3",
    spinnerSize: 15
  },
  sm: {
    minWClass: "min-w-20",
    hClass: "h-9",
    roundedClass: "rounded-lg",
    fontClass: "text-xs",
    pxClass: "px-3.5",
    spinnerSize: 17
  },
  md: {
    minWClass: "min-w-24",
    hClass: "h-14",
    roundedClass: "rounded-lg",
    fontClass: "text-sm",
    pxClass: "px-4",
    spinnerSize: 19
  },
  lg: {
    minWClass: "min-w-28",
    hClass: "h-16",
    roundedClass: "rounded-xl",
    fontClass: "text-base",
    pxClass: "px-5",
    spinnerSize: 21
  },
  xl: {
    minWClass: "min-w-32",
    hClass: "h-18",
    roundedClass: "rounded-2xl",
    fontClass: "text-lg",
    pxClass: "px-6",
    spinnerSize: 23
  }
} as const satisfies Record<ButtonSize, ButtonStyleConfig>;

export const MD_BY_MODE: Record<LayoutMode, ButtonSize> = {
  xs: "sm",
  sm: "md",
  md: "md",
  lg: "lg"
} as const;

export const resolveButtonSize = (mode: LayoutMode, size: ButtonSize): ButtonSize => {
  if (size !== "md") return size;
  return MD_BY_MODE[mode];
};

export const useButtonStyleConfig = (size: ButtonSize) => {
  const { mode } = useDensity();
  return useMemo(() => {
    const resolved = resolveButtonSize(mode, size);
    return buttonSizeToStyleMap[resolved];
  }, [mode, size]);
};
