import { useFonts as useExpoFonts } from "expo-font";

export const useFonts = () => {
  return useExpoFonts({
    NotoSans: require("../assets/fonts/NotoSans.ttf"),
    NotoSansJP: require("../assets/fonts/NotoSansJP.ttf")
  });
};
