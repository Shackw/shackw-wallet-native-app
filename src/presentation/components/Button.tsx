import { ReactNode } from "react";

import { Button, ButtonText } from "@/presentation/components/gluestack-ui/button";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { ButtonSize, useButtonStyleConfig } from "@/presentation/styles/button";
import { theme } from "@/presentation/styles/theme";
import { cn } from "@/shared/helpers/cn";

import type { LucideIcon } from "lucide-react-native";
import type { ViewStyle } from "react-native";

type ButtonProps = React.ComponentProps<typeof Button>;

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

function BaseButton({
  children,
  size,
  disabled,
  className,
  action,
  onPress,
  testID
}: {
  children: React.ReactNode;
  size: ButtonSize;
  disabled?: boolean;
  className?: string;
  action?: ButtonProps["action"];
  onPress?: () => void;
  testID?: string;
}) {
  const cfg = useButtonStyleConfig(size);

  return (
    <Button
      action={action}
      onPress={onPress}
      disabled={!!disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      className={cn(
        cfg.minWClass,
        cfg.hClass,
        cfg.roundedClass,
        cfg.pxClass,
        "flex-row items-center justify-center gap-1",
        disabled && "opacity-disabled",
        className
      )}
      testID={testID}
    >
      {children}
    </Button>
  );
}

const IconLeft = ({ Icon, color }: { Icon: LucideIcon; color: string }) => <Icon size={20} color={color} />;

export const ContainButton = ({
  text,
  size,
  icon,
  isLoading = false,
  isDisabled = false,
  onPress,
  className,
  testID
}: CommonProps) => {
  const cfg = useButtonStyleConfig(size);
  const disabled = isLoading || isDisabled;

  return (
    <BaseButton
      size={size}
      action="primary"
      disabled={disabled}
      onPress={onPress}
      className={cn(disabled ? "bg-secondary-500" : "bg-primary-500", className)}
      testID={testID}
    >
      {isLoading ? (
        <Spinner color="#ffffff" size={cfg.spinnerSize} />
      ) : (
        <>
          {icon && <IconLeft Icon={icon} color="#ffffff" />}
          <ButtonText className={cn("font-heading font-bold", cfg.fontClass, "text-white")}>{text}</ButtonText>
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
  testID
}: CommonProps) => {
  const cfg = useButtonStyleConfig(size);
  const disabled = isLoading || isDisabled;

  return (
    <BaseButton
      size={size}
      action="secondary"
      disabled={disabled}
      onPress={onPress}
      className={cn(
        disabled ? "bg-secondary-700" : "bg-secondary-200",
        "data-[active=true]:bg-secondary-300",
        className
      )}
      testID={testID}
    >
      {isLoading ? (
        <Spinner color={theme.colors.secondary[800]} size={cfg.spinnerSize} />
      ) : (
        <>
          {icon && <IconLeft Icon={icon} color={theme.colors.secondary[800]} />}
          <ButtonText className={cn("font-heading font-bold", cfg.fontClass, "text-secondary-800")}>{text}</ButtonText>
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
  testID
}: CommonProps) => {
  const cfg = useButtonStyleConfig(size);
  const disabled = isLoading || isDisabled;

  return (
    <BaseButton
      size={size}
      action="primary"
      disabled={disabled}
      onPress={onPress}
      className={cn(
        "border border-primary-400",
        disabled ? "bg-primary-200" : "bg-transparent",
        "border-[2.3px]",
        "data-[active=true]:bg-primary-100",
        className
      )}
      testID={testID}
    >
      {isLoading ? (
        <Spinner color="#f94c4c" size={cfg.spinnerSize} />
      ) : (
        <>
          {icon && <IconLeft Icon={icon} color="#f94c4c" />}
          <ButtonText
            className={cn(
              "font-heading font-bold",
              cfg.fontClass,
              "data-[active=true]:text-primary-500",
              "text-primary-400"
            )}
          >
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
  action?: React.ComponentProps<typeof Button>["action"];
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
  testID?: string;
  defaultProps?: Omit<React.ComponentProps<typeof Button>, "children">;
};

export const IconButton = ({
  icon: Icon,
  iconSize = 20,
  iconColor = "#ffffff",
  bgClassName = "bg-transparent",
  action,
  onPress,
  className,
  style,
  testID,
  defaultProps
}: IconButtonProps) => {
  return (
    <Button
      action={action}
      onPress={onPress}
      className={cn("w-0 h-0 px-[18px] py-[18px] rounded-[32px] items-center justify-center", bgClassName, className)}
      style={({ pressed }) => (pressed ? [{ opacity: 0.85 } as ViewStyle, style] : style)}
      testID={testID}
      accessibilityRole="button"
      {...defaultProps}
    >
      <Icon size={iconSize} color={iconColor} />
    </Button>
  );
};

type TextButtonProps = Pick<React.ComponentProps<typeof Button>, "onPress"> & {
  children: ReactNode;
  textProps: Omit<React.ComponentProps<typeof ButtonText>, "children">;
};

export const TextButton = (props: TextButtonProps) => {
  const { textProps, children, onPress } = props;
  const { className, ...rest } = textProps;

  return (
    <Button variant="link" action="secondary" className="justify-start p-0 h-auto" onPress={onPress}>
      <ButtonText {...rest} className={cn(className, "underline")}>
        {children}
      </ButtonText>
    </Button>
  );
};
