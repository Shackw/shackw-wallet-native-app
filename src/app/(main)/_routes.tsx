import { Stack } from "expo-router";

import { TokenBalanceProvider } from "@/providers/TokenBalanceProvider";

const MainRoutes = () => {
  return (
    <TokenBalanceProvider>
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
    </TokenBalanceProvider>
  );
};

export default MainRoutes;
