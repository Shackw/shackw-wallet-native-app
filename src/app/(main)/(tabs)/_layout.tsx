import { Slot } from "expo-router";

import BottomTab from "@/components/BottomTab";
import { Box } from "@/gluestack/box";

export default function TabsLayout() {
  return (
    <Box className="flex-1">
      <Slot />
      <BottomTab />
    </Box>
  );
}
