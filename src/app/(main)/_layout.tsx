import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { RootContainer } from "@/presentation/components/Container";
import { LastTransactionProvider } from "@/presentation/providers/LastTransactionProvider";
import { TokenBalanceProvider } from "@/presentation/providers/TokenBalanceProvider";

const MainLayout = () => {
  return (
    <TokenBalanceProvider>
      <LastTransactionProvider>
        <RootContainer>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" }
            }}
          >
            <Stack.Screen
              name="addresses/index"
              options={{
                presentation: "modal",
                animation: "fade"
              }}
            />
            <Stack.Screen
              name="receive/index"
              options={{
                presentation: "modal",
                animation: "fade"
              }}
            />
            <Stack.Screen
              name="scan-qr/index"
              options={{
                presentation: "fullScreenModal",
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
              name="network/index"
              options={{
                presentation: "modal",
                animation: "fade"
              }}
            />
            <Stack.Screen
              name="wallet/index"
              options={{
                presentation: "modal",
                animation: "fade"
              }}
            />
          </Stack>
        </RootContainer>
      </LastTransactionProvider>
    </TokenBalanceProvider>
  );
};

export default MainLayout;
