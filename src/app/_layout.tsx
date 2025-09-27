import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";

import { migrate } from "@/db";
import { useFonts } from "@/hooks/useFonts";
import { HinomaruWalletProvider } from "@/providers/HinomaruWalletProvider";
import { GluestackUIProvider } from "@/vendor/gluestack-ui/gluestack-ui-provider";
import { StatusBar } from "@/vendor/gluestack-ui/status-bar";

import "@/styles/global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SQLiteProvider databaseName="hinomaru-wallet.db" onInit={migrate}>
      <QueryClientProvider client={queryClient}>
        <HinomaruWalletProvider>
          <GluestackUIProvider>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" }
              }}
            />
          </GluestackUIProvider>
        </HinomaruWalletProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
};

export default RootLayout;
