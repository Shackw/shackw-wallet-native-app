import { useRouter } from "expo-router";

import Actionsheet from "@/presentation/components/ActionSheet";
import { BOTTOM_TAB_ACTION_SHEET_ITEMS } from "@/registries/BottomTabRegistry";

import BottomTabActionSheetItem from "./BottomTabActionSheetItem";

type BottomTabActionSheetProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const BottomTabActionSheet = (props: BottomTabActionSheetProps) => {
  const router = useRouter();
  const { isOpen, handleClose } = props;

  return (
    <Actionsheet isOpen={isOpen} handleClose={handleClose}>
      {BOTTOM_TAB_ACTION_SHEET_ITEMS.map(({ name, label, description, icon, path }) => {
        const handlePress = () => {
          router.push(path);
          handleClose();
        };
        return (
          <BottomTabActionSheetItem
            key={name}
            label={label}
            description={description}
            icon={icon}
            handlePress={handlePress}
          />
        );
      })}
    </Actionsheet>
  );
};

export default BottomTabActionSheet;
