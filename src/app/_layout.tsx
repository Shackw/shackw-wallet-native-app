import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { RootContainer } from "@/components/Container";
import { GluestackUIProvider } from "@/gluestack/gluestack-ui-provider";
import { StatusBar } from "@/gluestack/status-bar";
import { useFonts } from "@/hooks/useFonts";
import { HinomaruWalletProvider } from "@/providers/HinomaruWalletProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <HinomaruWalletProvider>
        <GluestackUIProvider mode="light">
          <RootContainer>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" }
              }}
            />
          </RootContainer>
        </GluestackUIProvider>
      </HinomaruWalletProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
