import { Slot } from "expo-router";

import BottomTab from "@/presentation/components/BottomTab";
import { Box } from "@/presentation/components/gluestack-ui/box";

export default function TabsLayout() {
  return (
    <Box className="flex-1">
      <Slot />
      <BottomTab />
    </Box>
  );
}
