import { Slot } from "expo-router";
import { useMemo } from "react";

import BottomTab from "@/presentation/components/BottomTab";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import type { BottomTabName } from "@/registries/BottomTabRegistry";

import WalletConnectCoordinator from "../_components/WalletConnectCoordinator";

const TabsLayout = () => {
  const { walletEnabled } = useShackwWalletContext();

  const disableItems = useMemo<BottomTabName[]>(() => {
    if (walletEnabled) return ["deposit"];
    return ["account", "deposit", "history", "transfer"];
  }, [walletEnabled]);

  return (
    <Box className="flex-1">
      <Slot />
      <BottomTab disables={disableItems} />
      <WalletConnectCoordinator />
    </Box>
  );
};

export default TabsLayout;
