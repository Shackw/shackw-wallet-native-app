import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import AppBarActions from "./AppBarActions";
import AppBarBody from "./AppBarBody";

export type AppBarProps = {
  title?: string;
};

const AppBar = (props: AppBarProps) => {
  const { title } = props;

  const isDefault = !title;
  const tw = useTw();

  return (
    <Box className={cn(tw.px(4), tw.py(5), tw.h(16))}>
      <HStack className="flex-row items-center justify-between">
        <AppBarBody title={title} />
        <AppBarActions isDefault={isDefault} />
      </HStack>
    </Box>
  );
};

export default AppBar;
