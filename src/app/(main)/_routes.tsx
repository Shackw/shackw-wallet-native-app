import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { RootContainer } from "@/components/Container";
import { TokenBalanceProvider } from "@/providers/TokenBalanceProvider";

const MainRoutes = () => {
  return (
    <TokenBalanceProvider>
      <RootContainer>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" }
          }}
        >
          <Stack.Screen
            name="receive/index"
            options={{
              presentation: "modal",
              animation: "fade"
            }}
          />
          <Stack.Screen
            name="transfer/index"
            options={{
              presentation: "modal",
              animation: "fade"
            }}
          />
          <Stack.Screen
            name="transferByQr/index"
            options={{
              presentation: "modal",
              animation: "fade"
            }}
          />
        </Stack>
      </RootContainer>
    </TokenBalanceProvider>
  );
};

export default MainRoutes;
