import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";

type AppBarOverlayBodyProps = {
  title: string;
};

const AppBarOverlayBody = ({ title }: AppBarOverlayBodyProps) => {
  return (
    <HStack className="w-full justify-center">
      <Text className="text-lg font-bold text-white">{title}</Text>
    </HStack>
  );
};

export default AppBarOverlayBody;
