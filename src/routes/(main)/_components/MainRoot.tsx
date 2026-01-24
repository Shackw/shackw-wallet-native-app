import { Stack } from "expo-router";
import { Platform } from "react-native";

import type { ShackwApiMetaModel } from "@/domain/shackwApiMeta";
import { RootContainer } from "@/presentation/components/Container";
import { LastTransactionProvider } from "@/presentation/providers/LastTransactionProvider";
import { ShackwApiMetaProvider } from "@/presentation/providers/ShackwApiMetaProvider";
import { TokenBalanceProvider } from "@/presentation/providers/TokenBalanceProvider";

type MainRootProps = {
  meta: ShackwApiMetaModel;
};

const animation = Platform.select<"default" | "fade">({
  ios: "default",
  android: "fade",
  default: "default"
});

const screenOptions = {
  presentation: "card" as const,
  animation,
  gestureEnabled: false
};

const MainRoot = ({ meta }: MainRootProps) => {
  return (
    <ShackwApiMetaProvider meta={meta}>
      <TokenBalanceProvider>
        <LastTransactionProvider>
          <RootContainer>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" }
              }}
            >
              <Stack.Screen name="addresses/index" options={screenOptions} />
              <Stack.Screen name="network/index" options={screenOptions} />
              <Stack.Screen name="privateKey/index" options={screenOptions} />
              <Stack.Screen name="receive/index" options={screenOptions} />
              <Stack.Screen name="scan-qr/index" options={screenOptions} />
              <Stack.Screen name="transfer/index" options={screenOptions} />
              <Stack.Screen name="wallet/index" options={screenOptions} />
            </Stack>
          </RootContainer>
        </LastTransactionProvider>
      </TokenBalanceProvider>
    </ShackwApiMetaProvider>
  );
};

export default MainRoot;
