import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { Box } from "@/gluestack/box";
import { theme } from "@/styles/theme";

import { AppBar, AppBarProps } from "./AppBar";

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

type ScreenContainerProps = React.ComponentProps<typeof Box> & AppBarProps;

export const ScreenContainer = (props: ScreenContainerProps) => {
  const { title, children, ...rest } = props;
  return (
    <Box className="flex-1">
      <AppBar title={title} />
      <Box {...rest} className="flex-1">
        {children}
      </Box>
    </Box>
  );
};
