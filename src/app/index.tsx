import { Redirect } from "expo-router";
import { useEffect } from "react";

import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";

const AppIndex = () => {
  const { account, hasPrivateKey } = useShackwWalletContext();
  const { show, hide } = useLoadingOverlay();

  const isLoading = !account && hasPrivateKey;
  const hasWallet = !!account && !!hasPrivateKey;

  useEffect(() => {
    if (isLoading) {
      show();
    } else {
      hide();
    }
  }, [isLoading, show, hide]);

  if (isLoading) return null;

  if (!hasWallet) return <Redirect href="/(onbording)" />;

  return <Redirect href="/(main)/(tabs)" />;
};

export default AppIndex;
