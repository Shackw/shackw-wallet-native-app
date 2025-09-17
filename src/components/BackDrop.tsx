import { Modal } from "react-native";

import { theme } from "@/styles/theme";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type BackDropProps = {
  visible: boolean;
};

const BackDrop = (props: BackDropProps) => {
  const { visible } = props;
  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <VStack className="flex-1 justify-center items-center bg-black/60">
        <Spinner size={48} color={theme.colors.primary[500]} />
      </VStack>
    </Modal>
  );
};

export default BackDrop;
