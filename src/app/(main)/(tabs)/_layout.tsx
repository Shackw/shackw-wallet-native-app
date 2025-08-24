import { Box } from "@gluestack-ui/themed";
import { Slot } from "expo-router";

import BottomTab from "@/components/BottomTab";

export default function TabsLayout() {
  return (
    <Box flex={1}>
      <Slot />
      <BottomTab />
    </Box>
  );
}
