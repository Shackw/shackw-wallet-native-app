import { TriangleAlert } from "lucide-react-native";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Icon, InfoIcon } from "@/presentation/components/gluestack-ui/icon";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

type TextProps = React.ComponentProps<typeof AppText> & {
  iconSize?: React.ComponentProps<typeof Icon>["size"];
};

export const InfoText = (props: TextProps) => {
  const { children, className, iconSize, ...rest } = props;
  const tw = useTw();

  return (
    <HStack className={cn("w-full", "items-center", tw.gapX(2))}>
      <Icon as={InfoIcon} size={iconSize} className="text-secondary-800" />
      <AppText {...rest} className={cn("flex-1", "text-secondary-700", "font-bold", className)}>
        {children}
      </AppText>
    </HStack>
  );
};

export const ErrorText = (props: TextProps) => {
  const { children, className, iconSize, ...rest } = props;
  const tw = useTw();

  return (
    <HStack className={cn("w-full", "items-center", tw.gapX(2))}>
      <Icon as={TriangleAlert} size={iconSize} className="text-primary-600" />
      <AppText {...rest} className={cn("flex-1", "text-primary-500", "font-bold", className)}>
        {children}
      </AppText>
    </HStack>
  );
};
