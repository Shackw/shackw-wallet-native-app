import React from "react";
import { Pressable } from "react-native";

import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type TabProps<T extends readonly string[]> = {
  options: T;
  value: T[number];
  handleChange: React.Dispatch<React.SetStateAction<T[number]>>;
};

type TabElementProps<T extends readonly string[]> = {
  label: T[number];
  isSelected: boolean;
  /** Width percent (0–100) */
  widthRatio: number;
  handleChange: React.Dispatch<React.SetStateAction<T[number]>>;
};

const TabElement = <T extends readonly string[]>({
  label,
  isSelected,
  widthRatio,
  handleChange
}: TabElementProps<T>) => {
  const textColor = isSelected ? "text-secondary-900" : "text-secondary-600";
  const barColor = isSelected ? "bg-primary-500" : "bg-transparent";

  return (
    <Pressable
      onPress={() => handleChange(label)}
      className="items-center justify-center"
      style={{ width: `${widthRatio}%` }}
      accessibilityRole="button"
    >
      <VStack className="w-full items-center justify-center">
        <Text className={`font-bold py-3.5 ${textColor}`}>{label}</Text>
        <Box className={`w-full ${barColor} h-[2px]`} />
      </VStack>
    </Pressable>
  );
};

export const Tab = <T extends readonly string[]>({ options, value, handleChange }: TabProps<T>) => {
  const widthRatio = 100 / options.length;

  return (
    <HStack className="w-full border-b border-secondary-100">
      {options.map(option => (
        <TabElement
          key={String(option)}
          label={option}
          isSelected={option === value}
          widthRatio={widthRatio}
          handleChange={handleChange}
        />
      ))}
    </HStack>
  );
};
