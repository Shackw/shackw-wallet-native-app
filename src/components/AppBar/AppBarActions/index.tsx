import { HStack } from "@gluestack-ui/themed";

import AppBarCopyAction from "./AppBarCopyAction";
import AppBarRouterBackAction from "./AppBarRouterBackAction";

type AppBarActionsProps = {
  isDefault: boolean;
};

const AppBarActions = (props: AppBarActionsProps) => {
  const { isDefault } = props;
  return (
    <HStack position="absolute" right="$0">
      {isDefault ? <AppBarCopyAction /> : <AppBarRouterBackAction />}
    </HStack>
  );
};

export default AppBarActions;
