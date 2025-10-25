import { HStack } from "@/vendor/gluestack-ui/hstack";
import { AlertCircleIcon, Icon, InfoIcon } from "@/vendor/gluestack-ui/icon";
import { Text } from "@/vendor/gluestack-ui/text";

type TextProps = React.ComponentProps<typeof Text>;

export const InfoText = (props: TextProps) => {
  const { children, size, className, ...rest } = props;
  return (
    <HStack className="items-center gap-x-2">
      <Icon as={InfoIcon} size={size} className="text-secondary-800" />
      <Text {...rest} className={`text-secondary-700 font-bold ${className}`}>
        {children}
      </Text>
    </HStack>
  );
};

export const ErrorText = (props: TextProps) => {
  const { children, size, className, ...rest } = props;
  return (
    <HStack className="items-center gap-x-2">
      <Icon as={AlertCircleIcon} size={size} className="text-primary-600" />
      <Text {...rest} className={`text-primary-500 font-bold ${className}`}>
        {children}
      </Text>
    </HStack>
  );
};
