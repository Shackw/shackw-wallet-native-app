import React from "react";
import { Pressable } from "react-native";

import { BOTTOM_TAB_ITEMS } from "@/registries/BottomTabRegistry";

import BottomTabIcon from "./BottomTabBarIcon";

type BottomTabItemProps = {
  label: (typeof BOTTOM_TAB_ITEMS)[number]["label"];
  Icon: (typeof BOTTOM_TAB_ITEMS)[number]["icon"];
  isFocused: boolean;
  width: number;
  isDisabled: boolean;
  handlePress: () => void;
};

const BottomTabItem = (props: BottomTabItemProps) => {
  const { label, Icon, isFocused, width, isDisabled, handlePress } = props;
  return (
    <Pressable
      onPress={handlePress}
      className="items-center"
      style={{ width: `${width}%` }}
      android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: true }}
      accessibilityRole="button"
      disabled={isDisabled}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <BottomTabIcon label={label} Icon={Icon} isFocused={isFocused} isDisabled={isDisabled} />
    </Pressable>
  );
};

export default BottomTabItem;
