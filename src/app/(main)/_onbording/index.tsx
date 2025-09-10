import { ContainButton } from "@/components/Button";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type OnBordingProps = {
  createHinomaruWallet: () => Promise<void>;
};

const OnBording = (props: OnBordingProps) => {
  const { createHinomaruWallet } = props;
  return (
    <VStack className="bg-white w-full h-full items-center justify-center">
      <ContainButton text="新作成" size="sm" onPress={createHinomaruWallet} />
    </VStack>
  );
};

export default OnBording;
