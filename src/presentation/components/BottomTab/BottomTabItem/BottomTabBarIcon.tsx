import { useMemo } from "react";

import { Text } from "@/presentation/components/gluestack-ui/text";
import { theme } from "@/presentation/styles/theme";

import type { LucideIcon } from "lucide-react-native";

type BottomTabIconProps = { label: string; Icon: LucideIcon; isFocused: boolean; isDisabled: boolean };

const BottomTabIcon = (props: BottomTabIconProps) => {
  const { label, Icon, isFocused, isDisabled } = props;

  const iconSize = isFocused ? 26 : 24;
  const textSizeClass = isFocused ? "text-sm" : "text-xs";

  const color = useMemo(() => {
    if (isDisabled) return theme.colors.secondary[300];
    if (isFocused) return theme.colors.primary[500];
    return theme.colors.secondary[700];
  }, [isDisabled, isFocused]);

  const textColor = useMemo(() => {
    if (isDisabled) return "text-secondary-300";
    if (isFocused) return "text-primary-500";
    return "text-secondary-700";
  }, [isDisabled, isFocused]);

  return (
    <>
      <Icon color={color} size={iconSize} />
      <Text className={`font-bold ${textSizeClass} ${textColor}`}>{label}</Text>
    </>
  );
};

export default BottomTabIcon;
