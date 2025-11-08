import {
  ActionsheetItem,
  ActionsheetIcon,
  ActionsheetItemText
} from "@/presentation/components/gluestack-ui/actionsheet";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { BOTTOM_TAB_ACTION_SHEET_ITEMS } from "@/registries/BottomTabRegistry";

type BottomTabActionSheetItemType = {
  label: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["label"];
  description: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["description"];
  icon: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["icon"];
  handlePress: () => void;
};

const BottomTabActionSheetItem = ({ label, description, icon, handlePress }: BottomTabActionSheetItemType) => {
  return (
    <ActionsheetItem onPress={handlePress} className="px-4 gap-4 h-20">
      <ActionsheetIcon as={icon} size="xl" className="text-primary-500" />
      <VStack>
        <ActionsheetItemText className="text-lg font-bold text-secondary-700">{label}</ActionsheetItemText>
        <ActionsheetItemText className="text-xs text-secondary-900">{description}</ActionsheetItemText>
      </VStack>
    </ActionsheetItem>
  );
};

export default BottomTabActionSheetItem;
