import { Box, useToken } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppBar, AppBarProps } from "./AppBar";

export const RootContainer = ({ children }: { children: React.ReactNode }) => {
  const colorStart = useToken<"colors">("colors", "primary400");
  const colorEnd = useToken<"colors">("colors", "white");

  return (
    <LinearGradient colors={[colorStart, colorEnd]} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.9 }}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

type ScreenContainerProps = React.ComponentProps<typeof Box> & AppBarProps;

export const ScreenContainer = (props: ScreenContainerProps) => {
  const { title, children, ...rest } = props;
  return (
    <Box flex={1}>
      <AppBar title={title} />
      <Box {...rest} flex={1}>
        {children}
      </Box>
    </Box>
  );
};
