import React from "react";
import { ActivityIndicator } from "react-native";

import { buttonSizeToStyleMap } from "@/styles/button";
import { theme } from "@/styles/theme";
import { Button, ButtonText } from "@/vendor/gluestack-ui/button";

import type { LucideIcon } from "lucide-react-native";
import type { ViewStyle } from "react-native";

type ButtonSize = keyof typeof buttonSizeToStyleMap;

type CommonProps = {
  text: string;
  size: ButtonSize;
  icon?: LucideIcon;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
  testID?: string;
};

const heightClass: Record<number, string> = {
  32: "h-8",
  36: "h-9",
  44: "h-11",
  52: "h-[52px]",
  60: "h-[60px]"
};

const minWClass: Record<number, string> = {
  64: "min-w-16",
  80: "min-w-20",
  96: "min-w-24",
  112: "min-w-28",
  128: "min-w-32"
};

const radiusClass: Record<number, string> = {
  6: "rounded-[6px]",
  8: "rounded-[8px]",
  10: "rounded-[10px]",
  12: "rounded-[12px]"
};

const fontClass: Record<number, string> = {
  10: "text-[10px]",
  12: "text-sm",
  14: "text-base",
  16: "text-lg",
  18: "text-xl"
};

function BaseButton({
  children,
  size,
  disabled,
  className,
  style,
  onPress,
  testID
}: {
  children: React.ReactNode;
  size: ButtonSize;
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
  onPress?: () => void;
  testID?: string;
}) {
  const cfg = buttonSizeToStyleMap[size];
  const h = heightClass[cfg.height];
  const minW = minWClass[cfg.minWidth];
  const rounded = radiusClass[cfg.rounded];

  return (
    <Button
      onPress={onPress}
      disabled={!!disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      className={[
        minW,
        h,
        rounded,
        "px-2 flex-row items-center justify-center gap-1",
        disabled ? "opacity-disabled" : "",
        className ?? ""
      ].join(" ")}
      style={({ pressed }) => (pressed && !disabled ? [{ opacity: 0.85 } as ViewStyle, style] : style)}
      testID={testID}
    >
      {children}
    </Button>
  );
}

const IconLeft = ({ Icon, color }: { Icon: LucideIcon; color: string }) => <Icon size={20} color={color} />;

const Spinner = ({ color, sizePx }: { color: string; sizePx: number }) => {
  const scale = sizePx / 18;
  return <ActivityIndicator color={color} style={{ transform: [{ scale }] }} />;
};

export const ContainButton = ({
  text,
  size,
  icon,
  isLoading = false,
  isDisabled = false,
  onPress,
  className,
  style,
  testID
}: CommonProps) => {
  const cfg = buttonSizeToStyleMap[size];
  const disabled = isLoading || isDisabled;

  return (
    <BaseButton
      size={size}
      disabled={disabled}
      onPress={onPress}
      className={[disabled ? "bg-secondary-500" : "bg-primary-500", className ?? ""].join(" ")}
      style={style}
      testID={testID}
    >
      {isLoading ? (
        <Spinner color="#ffffff" sizePx={cfg.spinnerSize} />
      ) : (
        <>
          {icon && <IconLeft Icon={icon} color="#ffffff" />}
          <ButtonText className={["font-heading font-bold", fontClass[cfg.fontSize], "text-white"].join(" ")}>
            {text}
          </ButtonText>
        </>
      )}
    </BaseButton>
  );
};

export const SubContainButton = ({
  text,
  size,
  icon,
  isLoading = false,
  isDisabled = false,
  onPress,
  className,
  style,
  testID
}: CommonProps) => {
  const cfg = buttonSizeToStyleMap[size];
  const disabled = isLoading || isDisabled;

  return (
    <BaseButton
      size={size}
      disabled={disabled}
      onPress={onPress}
      className={[disabled ? "bg-secondary-700" : "bg-secondary-200", className ?? ""].join(" ")}
      style={style}
      testID={testID}
    >
      {isLoading ? (
        <Spinner color={theme.colors.secondary[800]} sizePx={cfg.spinnerSize} />
      ) : (
        <>
          {icon && <IconLeft Icon={icon} color={theme.colors.secondary[800]} />}
          <ButtonText className={["font-heading font-bold", fontClass[cfg.fontSize], "text-secondary-800"].join(" ")}>
            {text}
          </ButtonText>
        </>
      )}
    </BaseButton>
  );
};

export const OutlineButton = ({
  text,
  size,
  icon,
  isLoading = false,
  isDisabled = false,
  onPress,
  className,
  style,
  testID
}: CommonProps) => {
  const cfg = buttonSizeToStyleMap[size];
  const disabled = isLoading || isDisabled;

  return (
    <BaseButton
      size={size}
      disabled={disabled}
      onPress={onPress}
      className={[
        "border border-primary-400",
        disabled ? "bg-primary-200" : "bg-transparent",
        "border-[2.3px]",
        className ?? ""
      ].join(" ")}
      style={style}
      testID={testID}
    >
      {isLoading ? (
        <Spinner color="#f94c4c" sizePx={cfg.spinnerSize} />
      ) : (
        <>
          {icon && <IconLeft Icon={icon} color="#f94c4c" />}
          <ButtonText className={["font-heading font-bold", fontClass[cfg.fontSize], "text-primary-400"].join(" ")}>
            {text}
          </ButtonText>
        </>
      )}
    </BaseButton>
  );
};

type IconButtonProps = {
  icon: LucideIcon;
  iconSize?: number;
  iconColor?: string;
  bgClassName?: string;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
  testID?: string;
};

export const IconButton = ({
  icon: Icon,
  iconSize = 20,
  iconColor = "#ffffff",
  bgClassName = "bg-transparent",
  onPress,
  className,
  style,
  testID
}: IconButtonProps) => {
  return (
    <Button
      onPress={onPress}
      className={[
        "w-0 h-0 px-[18px] py-[18px] rounded-[32px] items-center justify-center",
        bgClassName,
        className ?? ""
      ].join(" ")}
      style={({ pressed }) => (pressed ? [{ opacity: 0.85 } as ViewStyle, style] : style)}
      testID={testID}
      accessibilityRole="button"
    >
      <Icon size={iconSize} color={iconColor} />
    </Button>
  );
};
