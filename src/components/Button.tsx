import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";
import { LucideIcon } from "lucide-react-native";

import { buttonSizeToStyleMap } from "@/styles/button";

type ButtonProps = {
  text: string;
  size: Exclude<React.ComponentProps<typeof Button>["size"], undefined>;
  icon?: LucideIcon;
  isLoading?: boolean;
  isDisabled?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "w" | "mt" | "mb" | "minWidth" | "maxWidth" | "onPress">;

export const ContainButton = ({ text, size, icon, isLoading = false, isDisabled = false, ...rest }: ButtonProps) => {
  const mainColor = "white";
  const isUnPressable = isLoading || isDisabled;
  const bgColor = isUnPressable ? { bg: "$secondary500" } : {};
  const { fontSize, spinnerSize, ...buttonStyleConfig } = buttonSizeToStyleMap[size];

  return (
    <Button
      {...rest}
      {...buttonStyleConfig}
      {...bgColor}
      action="primary"
      variant="solid"
      disabled={isUnPressable}
      columnGap="$1"
      px="$2"
    >
      {isLoading ? (
        <ButtonSpinner size={spinnerSize} color={mainColor} />
      ) : (
        <>
          {icon && <ButtonIcon as={icon} size="lg" color={mainColor} />}
          <ButtonText fontSize={fontSize} fontWeight="$bold" color={mainColor}>
            {text}
          </ButtonText>
        </>
      )}
    </Button>
  );
};

export const SubContainButton = ({ text, size, icon, isLoading = false, isDisabled = false, ...rest }: ButtonProps) => {
  const mainColor = "$secondary800";
  const isUnPressable = isLoading || isDisabled;
  const bgColor = isUnPressable ? { bg: "$secondary700" } : {};
  const { fontSize, spinnerSize, ...buttonStyleConfig } = buttonSizeToStyleMap[size];

  return (
    <Button
      {...rest}
      {...buttonStyleConfig}
      {...bgColor}
      action="secondary"
      variant="solid"
      disabled={isUnPressable}
      columnGap="$1"
      px="$2"
      py="$2"
    >
      {isLoading ? (
        <ButtonSpinner size={spinnerSize} color={mainColor} />
      ) : (
        <>
          {icon && <ButtonIcon as={icon} size="lg" color={mainColor} />}
          <ButtonText color={mainColor} fontWeight="$bold" fontSize={fontSize}>
            {text}
          </ButtonText>
        </>
      )}
    </Button>
  );
};

export const OutlineButton = ({ text, size, icon, isLoading = false, isDisabled = false, ...rest }: ButtonProps) => {
  const mainColor = "$primary400";
  const isUnPressable = isLoading || isDisabled;
  const bgColor = isUnPressable ? { bg: "$primary200" } : {};
  const { fontSize, spinnerSize, ...buttonStyleConfig } = buttonSizeToStyleMap[size];

  return (
    <Button
      {...rest}
      {...buttonStyleConfig}
      {...bgColor}
      action="primary"
      variant="outline"
      disabled={isUnPressable}
      columnGap="$1"
      px="$2"
      py="$2"
      borderWidth={2.3}
    >
      {isLoading ? (
        <ButtonSpinner size={spinnerSize} color={mainColor} />
      ) : (
        <>
          {icon && <ButtonIcon as={icon} size="lg" color={mainColor} />}
          <ButtonText fontSize={fontSize} fontWeight="$bold" color={mainColor} $active-color="$primary700">
            {text}
          </ButtonText>
        </>
      )}
    </Button>
  );
};

type IconButtonProps = {
  icon: LucideIcon;
  iconSize?: React.ComponentProps<typeof ButtonIcon>["size"];
  iconColor?: React.ComponentProps<typeof ButtonIcon>["color"];
  bgColor?: React.ComponentProps<typeof Button>["bgColor"];
  handlePress: () => void;
};

export const IconButton = (props: IconButtonProps) => {
  const { icon, iconSize = "md", iconColor = "$white", bgColor = "$transparent", handlePress } = props;
  return (
    <Button w="$0" h="$0" px="$4.5" py="$4.5" rounded={32} bgColor={bgColor} onPress={handlePress}>
      <ButtonIcon as={icon} size={iconSize} color={iconColor} />
    </Button>
  );
};
