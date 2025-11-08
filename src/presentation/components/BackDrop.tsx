import { Modal } from "react-native";

import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";

type BackDropProps = {
  visible: boolean;
};

const BackDrop = (props: BackDropProps) => {
  const { visible } = props;
  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <VStack className="flex-1 justify-center items-center bg-white/70">
        <Spinner size={48} color={theme.colors.primary[500]} />
      </VStack>
    </Modal>
  );
};

export default BackDrop;
