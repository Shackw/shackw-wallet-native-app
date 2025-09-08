import { Text } from "@/gluestack/text";
import { theme } from "@/styles/theme";

import type { LucideIcon } from "lucide-react-native";

type Props = { label: string; icon: LucideIcon; isFocused: boolean };

const BottomTabIcon = ({ label, icon: Icon, isFocused }: Props) => {
  const color = isFocused ? theme.colors.primary[500] : theme.colors.secondary[700];
  const iconSize = isFocused ? 26 : 24;
  const textSizeClass = isFocused ? "text-sm" : "text-xs";
  const textColorClass = isFocused ? "text-primary-500" : "text-secondary-700";

  return (
    <>
      <Icon color={color} size={iconSize} />
      <Text className={`font-bold ${textSizeClass} ${textColorClass}`}>{label}</Text>
    </>
  );
};

export default BottomTabIcon;
