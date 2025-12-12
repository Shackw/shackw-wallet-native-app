import { Slot } from "expo-router";

import BottomTab from "@/presentation/components/BottomTab";
import { Box } from "@/presentation/components/gluestack-ui/box";

import WalletConnectCoordinator from "./_components/WalletConnectCoordinator";

const TabsLayout = () => {
  return (
    <Box className="flex-1">
      <Slot />
      <BottomTab />
      <WalletConnectCoordinator />
    </Box>
  );
};

export default TabsLayout;
