import { Box, HStack } from "@gluestack-ui/themed";

import AppBarActions from "./AppBarActions";
import AppBarBody from "./AppBarBody";

export type AppBarProps = {
  title?: string;
};

export const AppBar = (props: AppBarProps) => {
  const { title } = props;
  const isDefault = !title;

  return (
    <Box px="$4" py="$5" h="$16">
      <HStack alignItems="center" justifyContent="space-between">
        <AppBarBody title={title} />
        <AppBarActions isDefault={isDefault} />
      </HStack>
    </Box>
  );
};
