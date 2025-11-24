import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";

import { migrate } from "@/infrastructure/db";
import { GluestackUIProvider } from "@/presentation/components/gluestack-ui/gluestack-ui-provider";
import Loading from "@/presentation/components/Loading";
import { useFonts } from "@/presentation/hooks/useFonts";
import { ShackwWalletProvider } from "@/presentation/providers/ShackwWalletProvider";
import { WalletPreferencesProvider } from "@/presentation/providers/WalletPreferencesProvider";

import "@/presentation/styles/global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <Loading />;

  return (
    <SQLiteProvider databaseName="shackw-wallet.db" onInit={migrate}>
      <QueryClientProvider client={queryClient}>
        <WalletPreferencesProvider>
          <ShackwWalletProvider>
            <GluestackUIProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "transparent" }
                }}
              />
            </GluestackUIProvider>
          </ShackwWalletProvider>
        </WalletPreferencesProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
};

export default RootLayout;
