import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";

import { initAppCheck } from "@/config/firebase";
import { migrate } from "@/infrastructure/db";
import { GluestackUIProvider } from "@/presentation/components/gluestack-ui/gluestack-ui-provider";
import Loading from "@/presentation/components/Loading";
import Maintenance from "@/presentation/components/Maintenance";
import { useFonts } from "@/presentation/hooks/useFonts";
import { DependenciesContainerProvider } from "@/presentation/providers/DependenciesContainerProvider";
import { ShackwWalletProvider } from "@/presentation/providers/ShackwWalletProvider";
import { WalletPreferencesProvider } from "@/presentation/providers/WalletPreferencesProvider";

import "@/presentation/styles/global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts();
  const [queryClient] = useState(() => new QueryClient());

  const [appCheckToken, setAppCheckToken] = useState<string | null | undefined>();

  useEffect(() => {
    const init = async () => {
      const token = await initAppCheck().catch(() => null);
      setAppCheckToken(token);
    };
    init();
  }, []);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (appCheckToken === null) return <Maintenance />;

  if (!fontsLoaded || appCheckToken === undefined) return <Loading />;

  return (
    <SQLiteProvider databaseName="shackw-wallet.db" onInit={migrate}>
      <QueryClientProvider client={queryClient}>
        <DependenciesContainerProvider appCheckToken={appCheckToken}>
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
        </DependenciesContainerProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
};

export default RootLayout;
