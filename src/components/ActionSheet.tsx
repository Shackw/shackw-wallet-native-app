import {
  Actionsheet as GlueStackUiActionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator
} from "@/gluestack/actionsheet";

type ActionsheetProps = { isOpen: boolean; handleClose: () => void; children: React.ReactNode };

const Actionsheet = (props: ActionsheetProps) => {
  const { isOpen, handleClose, children } = props;
  return (
    <GlueStackUiActionsheet isOpen={isOpen} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper className="pb-6">
          <ActionsheetDragIndicator />
          {children}
        </ActionsheetDragIndicatorWrapper>
      </ActionsheetContent>
    </GlueStackUiActionsheet>
  );
};

export default Actionsheet;
