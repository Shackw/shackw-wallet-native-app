import { useFonts as useExpoFonts } from "expo-font";

export const useFonts = () => {
  return useExpoFonts({
    "NotoSansJP-Thin": require("../assets/fonts/NotoSansJP-Thin.ttf"),
    "NotoSansJP-ExtraLight": require("../assets/fonts/NotoSansJP-ExtraLight.ttf"),
    "NotoSansJP-Light": require("../assets/fonts/NotoSansJP-Light.ttf"),
    "NotoSansJP-Regular": require("../assets/fonts/NotoSansJP-Regular.ttf"),
    "NotoSansJP-Medium": require("../assets/fonts/NotoSansJP-Medium.ttf"),
    "NotoSansJP-SemiBold": require("../assets/fonts/NotoSansJP-SemiBold.ttf"),
    "NotoSansJP-Bold": require("../assets/fonts/NotoSansJP-Bold.ttf"),
    "NotoSansJP-ExtraBold": require("../assets/fonts/NotoSansJP-ExtraBold.ttf"),
    "NotoSansJP-Black": require("../assets/fonts/NotoSansJP-Black.ttf")
  });
};
