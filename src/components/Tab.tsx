import { HStack, VStack, Text, Pressable, Divider } from "@gluestack-ui/themed";
import { useMemo } from "react";

type TabProps<T extends readonly string[]> = {
  options: T;
  value: T[number];
  handleChange: React.Dispatch<React.SetStateAction<T[number]>>;
};

type TabElementProps<T extends readonly string[]> = {
  label: T[number];
  isSelected: boolean;
  /** Width ratio (value between 0 and 1, where 1 represents 100%) */
  widthRatio: number;
  handleChange: React.Dispatch<React.SetStateAction<T[number]>>;
};

const TabElement = <T extends readonly string[]>(props: TabElementProps<T>) => {
  const { label, isSelected, widthRatio, handleChange } = props;

  const fontColor = useMemo<React.ComponentProps<typeof Text>["color"]>(() => {
    if (isSelected) return "$secondary900";
    return "$secondary600";
  }, [isSelected]);

  const bottomBorderColor = useMemo<React.ComponentProps<typeof Divider>["bgColor"]>(() => {
    if (isSelected) return "$primary500";
    return "$transparent";
  }, [isSelected]);

  const handlePress = () => {
    handleChange(label);
  };

  return (
    <Pressable w={`${widthRatio}%`} onPress={handlePress}>
      <VStack alignItems="center" justifyContent="center">
        <Text color={fontColor} fontWeight="$bold" py="$3.5">
          {label}
        </Text>
        <Divider w="100%" h="$0.5" bgColor={bottomBorderColor} />
      </VStack>
    </Pressable>
  );
};

export const Tab = <T extends readonly string[]>(props: TabProps<T>) => {
  const { options, value, handleChange } = props;

  const widthRatio = 100 / options.length;

  return (
    <HStack w="100%" borderBottomWidth="$1" borderBottomColor="$secondary100">
      {options.map((option, index) => (
        <TabElement
          key={index}
          label={option}
          isSelected={option === value}
          widthRatio={widthRatio}
          handleChange={handleChange}
        />
      ))}
    </HStack>
  );
};
