import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import { migrate } from "@/db";
import { useFonts } from "@/hooks/useFonts";
import { HinomaruWalletProvider } from "@/providers/HinomaruWalletProvider";
import { UserSettingProvider } from "@/providers/UserSettingProvider";
import { GluestackUIProvider } from "@/vendor/gluestack-ui/gluestack-ui-provider";

import "@/styles/global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <Loading />;

  return (
    <SQLiteProvider databaseName="hinomaru-wallet.db" onInit={migrate}>
      <QueryClientProvider client={queryClient}>
        <UserSettingProvider>
          <HinomaruWalletProvider>
            <GluestackUIProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "transparent" }
                }}
              />
            </GluestackUIProvider>
          </HinomaruWalletProvider>
        </UserSettingProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
};

export default RootLayout;
