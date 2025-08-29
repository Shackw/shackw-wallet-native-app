import { ActionsheetIcon, ActionsheetItem, ActionsheetItemText, VStack } from "@gluestack-ui/themed";

import { BOTTOM_TAB_ACTION_SHEET_ITEMS } from "@/registries/BottomTabRegistry";

type BottomTabActionSheetItemType = {
  label: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["label"];
  description: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["description"];
  icon: (typeof BOTTOM_TAB_ACTION_SHEET_ITEMS)[number]["icon"];
  handlePress: () => void;
};

const BottomTabActionSheetItem = (props: BottomTabActionSheetItemType) => {
  const { label, description, icon, handlePress } = props;
  return (
    <ActionsheetItem onPress={handlePress} px="$4" columnGap="$4" height="$20">
      <ActionsheetIcon as={icon} size="xl" color="$primary500" />
      <VStack>
        <ActionsheetItemText size="lg" color="$secondary700" fontWeight="$bold">
          {label}
        </ActionsheetItemText>
        <ActionsheetItemText size="xs" color="$secondary1000">
          {description}
        </ActionsheetItemText>
      </VStack>
    </ActionsheetItem>
  );
};

export default BottomTabActionSheetItem;
