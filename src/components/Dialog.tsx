import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from "@/vendor/gluestack-ui/alert-dialog";
import { Text } from "@/vendor/gluestack-ui/text";

import { SubContainButton } from "./Button";

type DialogProps = { title: string; onClose: () => void } & React.ComponentProps<typeof AlertDialog>;

const Dialog = (props: DialogProps) => {
  const { title, children, onClose, ...rest } = props;
  return (
    <AlertDialog {...rest} onClose={onClose}>
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
    </AlertDialog>
  );
};

export default Dialog;
