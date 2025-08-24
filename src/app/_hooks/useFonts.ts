import { useFonts as useExpoFonts } from "expo-font";

const useFonts = () => {
  return useExpoFonts({
    Inter: require("../../assets/fonts/Inter-VariableFont.ttf"),
    NotoSansJP: require("../../assets/fonts/NotoSansJP-VariableFont.ttf")
  });
};

export default useFonts;
