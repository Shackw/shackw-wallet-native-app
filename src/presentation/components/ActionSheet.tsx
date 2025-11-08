import {
  Actionsheet as GlueStackUiActionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator
} from "@/presentation/components/gluestack-ui/actionsheet";

type ActionsheetProps = { isOpen: boolean; handleClose: () => void; children: React.ReactNode };

const Actionsheet = (props: ActionsheetProps) => {
  const { isOpen, handleClose, children } = props;
  return (
    <GlueStackUiActionsheet isOpen={isOpen} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </GlueStackUiActionsheet>
  );
};

export default Actionsheet;
