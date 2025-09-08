import { usePathname, useRouter } from "expo-router";

import { Box } from "@/gluestack/box";
import { HStack } from "@/gluestack/hstack";
import { useBoolean } from "@/hooks/useBoolean";
import { BOTTOM_TAB_ITEMS } from "@/registries/BottomTabRegistry";

import BottomTabActionSheet from "./BottomTabActionSheet";
import BottomTabItem from "./BottomTabItem";

const BottomTab = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpenActionSheet, setIsOpenActionSheet] = useBoolean(false);

  return (
    <Box className="bg-white py-1">
      <HStack className="flex-row items-center">
        {BOTTOM_TAB_ITEMS.map(({ name, path, icon, label }) => {
          const handlePress = name === "transfer" ? setIsOpenActionSheet.toggle : () => router.push(path);
          const itemWidth = 100 / BOTTOM_TAB_ITEMS.length;
          return (
            <BottomTabItem
              key={name}
              label={label}
              icon={icon}
              isFocused={pathname === path}
              width={itemWidth}
              handlePress={handlePress}
            />
          );
        })}
      </HStack>
      <BottomTabActionSheet isOpen={isOpenActionSheet} handleClose={setIsOpenActionSheet.off} />
    </Box>
  );
};

export default BottomTab;
