export const theme = {
  colors: {
    primary: {
      50: "#fff5f5",
      100: "#ffe0e0",
      200: "#ffbfbf",
      300: "#ff8f8f",
      400: "#f94c4c",
      500: "#E60012",
      600: "#cc1724",
      700: "#b21d27",
      800: "#98232a",
      900: "#7a1e25"
    },
    secondary: {
      50: "#fafafa",
      100: "#f0f0f0",
      200: "#e0e0e0",
      300: "#cfcfcf",
      400: "#bfbfbf",
      500: "#a7a7a7",
      600: "#8a8a8a",
      700: "#6e6e6e",
      800: "#4e4e4e",
      900: "#2e2e2e"
    },
    outline: "#e0e0e0",
    surface: "#ffffff",
    error: "#dc2626",
    success: "#16a34a",
    warning: "#f59e0b"
  },
  fontFamily: {
    sans: ["NotoSansJP", "System"],
    heading: ["Inter", "System"],
    mono: ["Courier", "monospace"]
  },
  fontSize: {
    xs: [12, { lineHeight: 18 }],
    sm: [14, { lineHeight: 20 }],
    base: [16, { lineHeight: 24 }],
    lg: [18, { lineHeight: 28 }],
    xl: [20, { lineHeight: 28 }],
    "2xl": [24, { lineHeight: 32 }]
  },
  borderRadius: { sm: 8, md: 12, lg: 16, full: 9999 },
  spacing: { 11: 44, 13: 52, 15: 60 },
  opacity: { disabled: "0.4" }
} as const;
