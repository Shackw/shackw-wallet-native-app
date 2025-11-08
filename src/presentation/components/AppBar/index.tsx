import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";

import AppBarActions from "./AppBarActions";
import AppBarBody from "./AppBarBody";

export type AppBarProps = {
  title?: string;
};

export const AppBar = (props: AppBarProps) => {
  const { title } = props;

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
