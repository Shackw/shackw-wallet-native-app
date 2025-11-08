import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { AlertCircleIcon, Icon, InfoIcon } from "@/presentation/components/gluestack-ui/icon";
import { Text } from "@/presentation/components/gluestack-ui/text";

type TextProps = React.ComponentProps<typeof Text> & { iconSize?: React.ComponentProps<typeof Icon>["size"] };

export const InfoText = (props: TextProps) => {
  const { children, size, className, iconSize, ...rest } = props;
  return (
    <HStack className="items-center gap-x-2">
      <Icon as={InfoIcon} size={iconSize} className="text-secondary-800" />
      <Text {...rest} className={`flex-1 text-secondary-700 font-bold ${className}`}>
        {children}
      </Text>
    </HStack>
  );
};

export const ErrorText = (props: TextProps) => {
  const { children, size, className, iconSize, ...rest } = props;
  return (
    <HStack className="items-center gap-x-2">
      <Icon as={AlertCircleIcon} size={iconSize} className="text-primary-600" />
      <Text {...rest} className={`flex-1 text-primary-500 font-bold ${className}`}>
        {children}
      </Text>
    </HStack>
  );
};
