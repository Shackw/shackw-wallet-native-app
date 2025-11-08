import { useFonts as useExpoFonts } from "expo-font";

export const useFonts = () => {
  return useExpoFonts({
    Inter: require("../assets/fonts/Inter-VariableFont.ttf"),
    NotoSansJP: require("../assets/fonts/NotoSansJP-VariableFont.ttf")
  });
};
