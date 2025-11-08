import { Redirect, Slot } from "expo-router";
import { StatusBar } from "react-native";

import { useHinomaruWalletContext } from "@/presentation/providers/HinomaruWalletProvider";

const OnbordingLayout = () => {
  const { account, hasPrivateKey } = useHinomaruWalletContext();
  const hasWallet = !!account && !!hasPrivateKey;

  if (hasWallet) return <Redirect href="/(main)/(tabs)" />;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Slot />
    </>
  );
};

export default OnbordingLayout;
