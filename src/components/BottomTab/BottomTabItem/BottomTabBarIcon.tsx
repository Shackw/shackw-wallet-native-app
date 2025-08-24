import { Text, useToken, Box } from "@gluestack-ui/themed";
import { LucideIcon, LucideProps } from "lucide-react-native";
import React, { useMemo } from "react";

type BottomTabIconProps = {
  label: string;
  icon: LucideIcon;
  isFocused: boolean;
};

const BottomTabIcon = (props: BottomTabIconProps) => {
  const { label, icon: IconComponent, isFocused: isFocus } = props;

  const defaultColor = useToken<"colors">("colors", "secondary700");
  const focusedColor = useToken<"colors">("colors", "primary500");

  const color = useMemo(() => {
    if (isFocus) return focusedColor;
    return defaultColor;
  }, [defaultColor, focusedColor, isFocus]);

  const iconSize = useMemo<LucideProps["size"]>(() => {
    if (isFocus) return 26;
    return 24;
  }, [isFocus]);

  const fonstSize = useMemo<React.ComponentProps<typeof Text>["size"]>(() => {
    if (isFocus) return "sm";
    return "xs";
  }, [isFocus]);

  return (
    <>
      <Box>{React.createElement(IconComponent, { color, size: iconSize })}</Box>
      <Text size={fonstSize} fontWeight="$bold" color={color}>
        {label}
      </Text>
    </>
  );
};

export default BottomTabIcon;
