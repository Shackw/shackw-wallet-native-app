import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { PropsWithChildren, useEffect, useState } from "react";

import { initAppCheck } from "@/config/firebase";
import { migrate } from "@/infrastructure/db";
import { GluestackUIProvider } from "@/presentation/components/gluestack-ui/gluestack-ui-provider";
import MaintenanceOverlay from "@/presentation/components/Maintenance";
import { useFonts } from "@/presentation/hooks/useFonts";
import { DependenciesContainerProvider } from "@/presentation/providers/DependenciesContainerProvider";
import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";
import { ShackwWalletProvider } from "@/presentation/providers/ShackwWalletProvider";
import { WalletPreferencesProvider } from "@/presentation/providers/WalletPreferencesProvider";

const RootProviders = ({ children }: PropsWithChildren) => {
  const [fontsLoaded] = useFonts();
  const [queryClient] = useState(() => new QueryClient());

  const { show, hide } = useLoadingOverlay();
  const [appCheckToken, setAppCheckToken] = useState<string | null | undefined>();

  useEffect(() => {
    const init = async () => {
      const token = await initAppCheck().catch(() => null);
      setAppCheckToken(token);
    };
    init();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const isInitializing = !fontsLoaded || appCheckToken === undefined;

  useEffect(() => {
    if (isInitializing) {
      show();
    } else {
      hide();
    }
  }, [isInitializing, show, hide]);

  if (appCheckToken === null) {
    return (
      <MaintenanceOverlay
        text={`安全性を確認できなかったため処理を続行できませんでした。少し時間をおいて再度お試しください。`}
      />
    );
  }

  if (isInitializing) return null;

  return (
    <SQLiteProvider databaseName="shackw-wallet.db" onInit={migrate}>
      <QueryClientProvider client={queryClient}>
        <DependenciesContainerProvider appCheckToken={appCheckToken!}>
          <WalletPreferencesProvider>
            <ShackwWalletProvider>
              <GluestackUIProvider>{children}</GluestackUIProvider>
            </ShackwWalletProvider>
          </WalletPreferencesProvider>
        </DependenciesContainerProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
};

export default RootProviders;
