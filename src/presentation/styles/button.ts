import { LayoutMode } from "./density";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonSizeConfig = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonStyleConfig = {
  minWClass: string;
  hClass: string;
  roundedClass: string;
  fontClass: string;
  pxClass: string;
  spinnerSize: number;
};

const buttonSizeToStyles = {
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
    hClass: "h-10",
    roundedClass: "rounded-lg",
    fontClass: "text-xs",
    pxClass: "px-3.5",
    spinnerSize: 17
  },
  md: {
    minWClass: "min-w-24",
    hClass: "h-12",
    roundedClass: "rounded-lg",
    fontClass: "text-sm",
    pxClass: "px-7",
    spinnerSize: 19
  },
  lg: {
    minWClass: "min-w-28",
    hClass: "h-14",
    roundedClass: "rounded-xl",
    fontClass: "text-base",
    pxClass: "px-9",
    spinnerSize: 21
  },
  xl: {
    minWClass: "min-w-32",
    hClass: "h-16",
    roundedClass: "rounded-2xl",
    fontClass: "text-lg",
    pxClass: "px-12",
    spinnerSize: 23
  }
} as const satisfies Record<ButtonSizeConfig, ButtonStyleConfig>;

export const modeToButtonStyles = {
  xs: { sm: buttonSizeToStyles.xs, md: buttonSizeToStyles.sm, lg: buttonSizeToStyles.md },
  sm: { sm: buttonSizeToStyles.sm, md: buttonSizeToStyles.md, lg: buttonSizeToStyles.lg },
  md: { sm: buttonSizeToStyles.sm, md: buttonSizeToStyles.md, lg: buttonSizeToStyles.lg },
  lg: { sm: buttonSizeToStyles.md, md: buttonSizeToStyles.lg, lg: buttonSizeToStyles.xl }
} as const satisfies Record<LayoutMode, Record<ButtonSize, ButtonStyleConfig>>;
