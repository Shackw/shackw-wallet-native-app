import { Stack } from "expo-router";

import { ShackwApiMetaModel } from "@/domain/shackwApiMeta";
import { RootContainer } from "@/presentation/components/Container";
import { LastTransactionProvider } from "@/presentation/providers/LastTransactionProvider";
import { ShackwApiMetaProvider } from "@/presentation/providers/ShackwApiMetaProvider";
import { TokenBalanceProvider } from "@/presentation/providers/TokenBalanceProvider";

type MainRootProps = {
  meta: ShackwApiMetaModel;
};

const MainRoot = (props: MainRootProps) => {
  const { meta } = props;
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
              <Stack.Screen
                name="addresses/index"
                options={{
                  presentation: "card",
                  animation: "fade",
                  gestureEnabled: false
                }}
              />
              <Stack.Screen
                name="network/index"
                options={{
                  presentation: "card",
                  animation: "fade",
                  gestureEnabled: false
                }}
              />
              <Stack.Screen
                name="privateKey/index"
                options={{
                  presentation: "card",
                  animation: "fade",
                  gestureEnabled: false
                }}
              />
              <Stack.Screen
                name="receive/index"
                options={{
                  presentation: "card",
                  animation: "fade",
                  gestureEnabled: false
                }}
              />
              <Stack.Screen
                name="scan-qr/index"
                options={{
                  presentation: "card",
                  animation: "fade",
                  gestureEnabled: false
                }}
              />
              <Stack.Screen
                name="transfer/index"
                options={{
                  presentation: "card",
                  animation: "fade",
                  gestureEnabled: false
                }}
              />
              <Stack.Screen
                name="wallet/index"
                options={{
                  presentation: "card",
                  animation: "fade",
                  gestureEnabled: false
                }}
              />
            </Stack>
          </RootContainer>
        </LastTransactionProvider>
      </TokenBalanceProvider>
    </ShackwApiMetaProvider>
  );
};

export default MainRoot;
