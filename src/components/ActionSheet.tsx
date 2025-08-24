import {
  Actionsheet as GlueStackUiActionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper
} from "@gluestack-ui/themed";

type ActionsheetProps = { isOpen: boolean; handleClose: () => void; children: React.ReactNode };

const Actionsheet = (props: ActionsheetProps) => {
  const { isOpen, handleClose, children } = props;
  return (
    <GlueStackUiActionsheet isOpen={isOpen} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper paddingBottom="$6">
          <ActionsheetDragIndicator />
          {children}
        </ActionsheetDragIndicatorWrapper>
      </ActionsheetContent>
    </GlueStackUiActionsheet>
  );
};

export default Actionsheet;
