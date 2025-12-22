import { usePathname, useRouter } from "expo-router";

import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { BOTTOM_TAB_ITEMS, BottomTabName } from "@/registries/BottomTabRegistry";

import BottomTabActionSheet from "./BottomTabActionSheet";
import BottomTabItem from "./BottomTabItem";

export type BottomTabProps = {
  disables?: BottomTabName[];
};

const BottomTab = (props: BottomTabProps) => {
  const { disables } = props;

  const router = useRouter();
  const pathname = usePathname();

  const [isOpenActionSheet, setIsOpenActionSheet] = useBoolean(false);

  return (
    <Box className="bg-white py-1">
      <HStack className="items-center">
        {BOTTOM_TAB_ITEMS.map(({ name, path, icon, label }) => {
          const handlePress = name === "transfer" ? setIsOpenActionSheet.toggle : () => router.push(path);
          const itemWidth = 100 / BOTTOM_TAB_ITEMS.length;
          return (
            <BottomTabItem
              key={name}
              label={label}
              Icon={icon}
              isFocused={pathname === path}
              width={itemWidth}
              isDisabled={!!disables?.includes(name)}
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
