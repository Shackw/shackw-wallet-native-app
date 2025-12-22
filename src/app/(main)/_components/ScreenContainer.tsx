import { Box } from "@/presentation/components/gluestack-ui/box";

import AppBar, { AppBarProps } from "./AppBar";

type ScreenContainerProps = React.ComponentProps<typeof Box> & { appBarProps?: AppBarProps };

const ScreenContainer = (props: ScreenContainerProps) => {
  const { appBarProps, children, className, ...rest } = props;
  return (
    <Box className="flex-1">
      <AppBar {...appBarProps} />
      <Box {...rest} className={`flex-1 ${className}`}>
        {children}
      </Box>
    </Box>
  );
};

export default ScreenContainer;
