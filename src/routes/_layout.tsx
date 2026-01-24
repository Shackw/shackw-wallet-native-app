import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { GluestackUIProvider } from "@/presentation/components/gluestack-ui/gluestack-ui-provider";
import { LoadingOverlayProvider } from "@/presentation/providers/LoadingOverlayProvider";

import RootProviders from "./_components/RootProviders";

import "@/presentation/styles/global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
    <GluestackUIProvider>
      <LoadingOverlayProvider>
        <RootProviders>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" }
            }}
          />
        </RootProviders>
      </LoadingOverlayProvider>
    </GluestackUIProvider>
  );
};

export default RootLayout;
