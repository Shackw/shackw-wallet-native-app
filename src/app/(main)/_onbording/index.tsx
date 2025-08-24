import { VStack } from "@gluestack-ui/themed";

import { ContainButton } from "@/components/Button";

type OnBordingProps = {
  createHinomaruWallet: () => Promise<void>;
};

const OnBording = (props: OnBordingProps) => {
  const { createHinomaruWallet } = props;
  return (
    <VStack bg="$white" w="$full" h="$full" alignItems="center" justifyContent="center">
      <ContainButton text="新作成" size="sm" onPress={createHinomaruWallet} />
    </VStack>
  );
};

export default OnBording;
