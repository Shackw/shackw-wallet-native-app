import { ContainButton } from "@/components/Button";
import { VStack } from "@/vendor/gluestack-ui/vstack";

const OnBording = () => {
  return (
    <VStack className="bg-white w-full h-full items-center justify-center">
      <ContainButton text="新作成" size="sm" onPress={() => console.log()} />
    </VStack>
  );
};

export default OnBording;
