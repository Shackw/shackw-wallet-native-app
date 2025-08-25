import { HStack, Text } from "@gluestack-ui/themed";

type AppBarOverlayBodyProps = {
  title: string;
};

const AppBarOverlayBody = ({ title }: AppBarOverlayBodyProps) => {
  return (
    <HStack alignItems="center" marginHorizontal="auto">
      <Text size="lg" color="white" fontWeight="bold">
        {title}
      </Text>
    </HStack>
  );
};

export default AppBarOverlayBody;
