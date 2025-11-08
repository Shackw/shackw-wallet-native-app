type ButtonStyleConfig = {
  minWidth: number;
  height: number;
  rounded: number;
  fontSize: number;
  spinnerSize: number;
};

export const buttonSizeToStyleMap = {
  xs: {
    minWidth: 64,
    height: 32,
    rounded: 6,
    fontSize: 10,
    spinnerSize: 16
  },
  sm: {
    minWidth: 80,
    height: 36,
    rounded: 8,
    fontSize: 12,
    spinnerSize: 18
  },
  md: {
    minWidth: 96,
    height: 44,
    rounded: 8,
    fontSize: 14,
    spinnerSize: 20
  },
  lg: {
    minWidth: 112,
    height: 52,
    rounded: 10,
    fontSize: 16,
    spinnerSize: 22
  },
  xl: {
    minWidth: 128,
    height: 60,
    rounded: 12,
    fontSize: 18,
    spinnerSize: 24
  }
} as const satisfies Record<string, ButtonStyleConfig>;
