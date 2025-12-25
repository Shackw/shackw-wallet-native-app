import {
  ActionsheetItem,
  ActionsheetIcon,
  ActionsheetItemText
} from "@/presentation/components/gluestack-ui/actionsheet";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { BOTTOM_TAB_ACTION_SHEET_ITEMS } from "@/registries/BottomTabRegistry";
import { cn } from "@/shared/helpers/cn";

type BottomTabActionSheetItemType = {
  label: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["label"];
  description: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["description"];
  icon: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["icon"];
  handlePress: () => void;
};

const BottomTabActionSheetItem = ({ label, description, icon, handlePress }: BottomTabActionSheetItemType) => {
  const tw = useTw();

  return (
    <ActionsheetItem onPress={handlePress} className={cn(tw.px(6), tw.gap(4), tw.h(25))}>
      <ActionsheetIcon as={icon} size="lg" className="text-primary-500" />
      <VStack>
        <ActionsheetItemText className={cn(["font-bold text-secondary-700", tw.text("lg")])}>
          {label}
        </ActionsheetItemText>
        <ActionsheetItemText className={cn(["text-secondary-900", tw.text("sm")])}>{description}</ActionsheetItemText>
      </VStack>
    </ActionsheetItem>
  );
};

export default BottomTabActionSheetItem;
