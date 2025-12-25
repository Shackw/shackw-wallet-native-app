import { AppText } from "@/presentation/components/AppText";
import {
  AlertDialog as GlueStackUiAlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from "@/presentation/components/gluestack-ui/alert-dialog";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import { ContainButton, SubContainButton } from "./Button";

type DialogProps = { title: string; onClose: () => void } & React.ComponentProps<typeof GlueStackUiAlertDialog>;

export const AlertDialog = (props: DialogProps) => {
  const tw = useTw();
  const { title, children, onClose, ...rest } = props;

  return (
    <GlueStackUiAlertDialog {...rest} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AppText t="lg" className="text-secondary-700 font-bold">
            {title}
          </AppText>
        </AlertDialogHeader>

        <AlertDialogBody className={cn(tw.mt(3), tw.mb(4))}>{children}</AlertDialogBody>

        <AlertDialogFooter>
          <SubContainButton text="閉じる" size="md" onPress={onClose} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </GlueStackUiAlertDialog>
  );
};

type ActionDialogProps = DialogProps & {
  action: "primary" | "secondary";
  buttonProps: Omit<React.ComponentProps<typeof ContainButton>, "size">;
};

export const ActionDialog = (props: ActionDialogProps) => {
  const tw = useTw();
  const { title, children, action, buttonProps, ...rest } = props;

  return (
    <GlueStackUiAlertDialog {...rest}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AppText t="lg" className="text-secondary-700 font-bold">
            {title}
          </AppText>
        </AlertDialogHeader>

        <AlertDialogBody className={cn(tw.mt(3), tw.mb(4))}>{children}</AlertDialogBody>

        <AlertDialogFooter>
          {action === "primary" ? (
            <ContainButton {...buttonProps} size="md" />
          ) : (
            <SubContainButton {...buttonProps} size="md" />
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </GlueStackUiAlertDialog>
  );
};
