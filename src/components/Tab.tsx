import React from "react";
import { Pressable, View } from "react-native";

import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";

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
      <VStack className="items-center justify-center">
        <Text className={`font-bold py-3.5 ${textColor}`}>{label}</Text>
        <View className={`w-full ${barColor}`} style={{ height: 2 }} />
      </VStack>
    </Pressable>
  );
};

export const Tab = <T extends readonly string[]>({ options, value, handleChange }: TabProps<T>) => {
  const widthRatio = 100 / options.length;

  return (
    <HStack className="w-full flex-row border-b border-secondary-100">
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
