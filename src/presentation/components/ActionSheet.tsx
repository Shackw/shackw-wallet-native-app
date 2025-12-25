import {
  Actionsheet as GlueStackUiActionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator
} from "@/presentation/components/gluestack-ui/actionsheet";

import { useTw } from "../styles/tw";

type ActionsheetProps = { isOpen: boolean; handleClose: () => void; children: React.ReactNode };

const Actionsheet = (props: ActionsheetProps) => {
  const { isOpen, handleClose, children } = props;

  const tw = useTw();

  return (
    <GlueStackUiActionsheet isOpen={isOpen} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className={tw.px(0)}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </GlueStackUiActionsheet>
  );
};

export default Actionsheet;
