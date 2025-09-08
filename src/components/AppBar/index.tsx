import { Box } from "@/gluestack/box";
import { HStack } from "@/gluestack/hstack";

import AppBarActions from "./AppBarActions";
import AppBarBody from "./AppBarBody";

export type AppBarProps = {
  title?: string;
};

export const AppBar = ({ title }: AppBarProps) => {
  const isDefault = !title;

  return (
    <Box className="px-4 py-5 h-16">
      <HStack className="flex-row items-center justify-between">
        <AppBarBody title={title} />
        <AppBarActions isDefault={isDefault} />
      </HStack>
    </Box>
  );
};
