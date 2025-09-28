import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type AddressCircleProps = {
  text: string;
  size: "sm" | "md" | "lg";
  color: string;
};

const sizeToBoxSize = { sm: 50, md: 60, lg: 80 } as const satisfies Record<AddressCircleProps["size"], number>;

const sizeToFontSize = { sm: 25, md: 28, lg: 30 } as const satisfies Record<AddressCircleProps["size"], number>;

const AddressCircle = (props: AddressCircleProps) => {
  const { text, size, color } = props;
  const startWith = text.slice(0, 1).toUpperCase();
  const boxSize = sizeToBoxSize[size];
  const fontSize = sizeToFontSize[size];

  return (
    <VStack
      className="rounded-full items-center justify-center"
      style={{ width: boxSize, height: boxSize, backgroundColor: color }}
    >
      <Text className="font-bold text-white leading-[3rem]" style={{ fontSize }}>
        {startWith}
      </Text>
    </VStack>
  );
};

export default AddressCircle;
