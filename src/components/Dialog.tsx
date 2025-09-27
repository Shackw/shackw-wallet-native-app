import {
  AlertDialog as GlueStackUiAlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from "@/vendor/gluestack-ui/alert-dialog";
import { Text } from "@/vendor/gluestack-ui/text";

import { ContainButton, SubContainButton } from "./Button";

type DialogProps = { title: string; onClose: () => void } & React.ComponentProps<typeof GlueStackUiAlertDialog>;

export const AlertDialog = (props: DialogProps) => {
  const { title, children, onClose, ...rest } = props;
  return (
    <GlueStackUiAlertDialog {...rest} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text className="text-secondary-700 font-bold" size="lg">
            {title}
          </Text>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">{children}</AlertDialogBody>
        <AlertDialogFooter className="">
          <SubContainButton text="閉じる" size="md" onPress={onClose} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </GlueStackUiAlertDialog>
  );
};

type ActionDialogProps = DialogProps & { buttonProps: Omit<React.ComponentProps<typeof ContainButton>, "size"> };
export const ActionDialog = (props: ActionDialogProps) => {
  const { title, children, buttonProps, ...rest } = props;
  return (
    <GlueStackUiAlertDialog {...rest}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text className="text-secondary-700 font-bold" size="lg">
            {title}
          </Text>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">{children}</AlertDialogBody>
        <AlertDialogFooter className="">
          <ContainButton {...buttonProps} size="md" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </GlueStackUiAlertDialog>
  );
};
