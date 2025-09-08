import React from "react";
import { Pressable } from "react-native";

import { BOTTOM_TAB_ITEMS } from "@/registries/BottomTabRegistry";

import BottomTabIcon from "./BottomTabBarIcon";

type BottomTabItemProps = {
  label: (typeof BOTTOM_TAB_ITEMS)[number]["label"];
  icon: (typeof BOTTOM_TAB_ITEMS)[number]["icon"];
  isFocused: boolean;
  width: number;
  handlePress: () => void;
};

const BottomTabItem = ({ label, icon, isFocused, width, handlePress }: BottomTabItemProps) => {
  return (
    <Pressable
      onPress={handlePress}
      className="items-center"
      style={{ width: `${width}%` }}
      android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: true }}
      accessibilityRole="button"
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <BottomTabIcon label={label} icon={icon} isFocused={isFocused} />
    </Pressable>
  );
};

export default BottomTabItem;
