import React from "react";
import { Pressable } from "react-native";

import { AppText } from "@/presentation/components/AppText";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

type TabOption = { [key: string]: string };

type TabProps<T extends TabOption> = {
  options: T;
  value: keyof T;
  handleChange: React.Dispatch<React.SetStateAction<keyof T>>;
};

type TabElementProps<T extends TabOption> = {
  option: keyof T;
  label: T[keyof T];
  isSelected: boolean;
  /** Width percent (0–100) */
  widthRatio: number;
  handleChange: React.Dispatch<React.SetStateAction<keyof T>>;
};

const TabElement = <T extends TabOption>({
  option,
  label,
  isSelected,
  widthRatio,
  handleChange
}: TabElementProps<T>) => {
  const tw = useTw();
  const textColor = isSelected ? "text-secondary-900" : "text-secondary-600";
  const barColor = isSelected ? "bg-primary-500" : "bg-transparent";

  return (
    <Pressable
      onPress={() => handleChange(option)}
      className={cn("items-center", "justify-center")}
      style={{ width: `${widthRatio}%` }}
      accessibilityRole="button"
    >
      <VStack className={cn("w-full", "items-center", "justify-center")}>
        <AppText t="md" className={cn("font-bold", tw.py(3.5), textColor)}>
          {label}
        </AppText>
        <Box className={cn("w-full", barColor, "h-[2px]")} />
      </VStack>
    </Pressable>
  );
};

export const Tab = <T extends TabOption>({ options, value, handleChange }: TabProps<T>) => {
  const optionKeys = Object.keys(options);
  const widthRatio = 100 / optionKeys.length;

  return (
    <HStack className={cn("w-full", "border-b", "border-secondary-100")}>
      {optionKeys.map(key => (
        <TabElement
          key={String(key)}
          option={key}
          label={options[key as keyof T]}
          isSelected={key === value}
          widthRatio={widthRatio}
          handleChange={handleChange}
        />
      ))}
    </HStack>
  );
};
