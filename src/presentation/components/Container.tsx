import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/presentation/styles/theme";

export const RootContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={[theme.colors.primary[400], "#ffffff"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.9 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};
