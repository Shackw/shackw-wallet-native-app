import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";

type AppBarOverlayBodyProps = {
  title: string;
};

const AppBarOverlayBody = ({ title }: AppBarOverlayBodyProps) => {
  return (
    <HStack className="self-center items-center">
      <Text className="text-lg font-bold text-white">{title}</Text>
    </HStack>
  );
};

export default AppBarOverlayBody;
