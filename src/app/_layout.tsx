import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { LoadingOverlayProvider } from "@/presentation/providers/LoadingOverlayProvider";

import RootProviders from "./_components/RootProviders";

import "@/presentation/styles/global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
