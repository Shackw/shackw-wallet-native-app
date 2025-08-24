import "../polyfills";

import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import useFonts from "@/app/_hooks/useFonts";
import { RootContainer } from "@/components/Container";
import { HinomaruWalletProvider } from "@/providers/HinomaruWalletProvider";
import { theme } from "@/styles/theme";

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
        <GluestackUIProvider config={theme}>
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
