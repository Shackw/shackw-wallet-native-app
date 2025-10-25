import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";

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
