import { HStack } from "@/gluestack/hstack";

import AppBarCopyAction from "./AppBarCopyAction";
import AppBarRouterBackAction from "./AppBarRouterBackAction";

type AppBarActionsProps = {
  isDefault: boolean;
};

const AppBarActions = (props: AppBarActionsProps) => {
  const { isDefault } = props;
  return <HStack className="absolute right-0">{isDefault ? <AppBarCopyAction /> : <AppBarRouterBackAction />}</HStack>;
};

export default AppBarActions;
