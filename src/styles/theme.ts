import { config } from "@gluestack-ui/config";

export const theme = {
  ...config,
  tokens: {
    ...config.tokens,
    fonts: {
      body: "NotoSansJP",
      heading: "Inter",
      mono: "Courier"
    },
    colors: {
      ...config.tokens.colors,
      primary50: "#fff5f5",
      primary100: "#ffe0e0",
      primary200: "#ffbfbf",
      primary300: "#ff8f8f",
      primary400: "#f94c4c",
      primary500: "#E60012",
      primary600: "#cc1724",
      primary700: "#b21d27",
      primary800: "#98232a",
      primary900: "#7a1e25",
      secondary50: "#fafafa",
      secondary100: "#f0f0f0",
      secondary200: "#e0e0e0",
      secondary300: "#cfcfcf",
      secondary400: "#bfbfbf",
      secondary500: "#a7a7a7",
      secondary600: "#8a8a8a",
      secondary700: "#6e6e6e",
      secondary800: "#4e4e4e",
      secondary900: "#2e2e2e",
      transparent: "transparent"
    }
  }
};
