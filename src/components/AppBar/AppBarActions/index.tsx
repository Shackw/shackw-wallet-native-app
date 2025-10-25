import { HStack } from "@/vendor/gluestack-ui/hstack";

import AppBarDefaultActions from "./AppBarDefaultActions";
import AppBarOverlayActions from "./AppBarOverlayActions";

type AppBarActionsProps = {
  isDefault: boolean;
};

const AppBarActions = (props: AppBarActionsProps) => {
  const { isDefault } = props;
  return (
    <HStack className="absolute right-0">{isDefault ? <AppBarDefaultActions /> : <AppBarOverlayActions />}</HStack>
  );
};

export default AppBarActions;
