import { Pressable } from "@gluestack-ui/themed";

import { BOTTOM_TAB_ITEMS } from "@/registries/bottomTabRegistry";

import BottomTabIcon from "./BottomTabBarIcon";

type BottomTabItemProps = {
  label: (typeof BOTTOM_TAB_ITEMS)[number]["label"];
  icon: (typeof BOTTOM_TAB_ITEMS)[number]["icon"];
  isFocused: boolean;
  width: number;
  handlePress: () => void;
};

const BottomTabItem = (props: BottomTabItemProps) => {
  const { label, icon, isFocused, width, handlePress } = props;
  return (
    <Pressable w={`${width}%`} alignItems="center" onPress={handlePress}>
      <BottomTabIcon label={label} icon={icon} isFocused={isFocused} />
    </Pressable>
  );
};

export default BottomTabItem;
