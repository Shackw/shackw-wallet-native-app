import { HStack, Text } from "@gluestack-ui/themed";

type OverlayAppBarBodyProps = {
  title: string;
};

const OverlayAppBarBody = ({ title }: OverlayAppBarBodyProps) => {
  return (
    <HStack alignItems="center" marginHorizontal="auto">
      <Text size="lg" color="white" fontWeight="bold">
        {title}
      </Text>
    </HStack>
  );
};

export default OverlayAppBarBody;
