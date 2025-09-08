/** @type {import('tailwindcss').Config} */
const { theme } = require("./src/styles/theme");

module.exports = {
  darkMode: false,
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./src/vendor/gluestack-ui/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...theme.colors,
        primary: theme.colors.primary,
        secondary: theme.colors.secondary
      },
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      borderRadius: theme.radius,
      spacing: theme.spacing,
      opacity: { disabled: String(theme.opacity.disabled) }
    }
  },
  plugins: []
};
