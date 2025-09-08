import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

import useLastTransactionElement from "../_hooks/useLastTransactionElement";

const HomeLastTransactionAt = () => {
  const { lastTransactionResult } = useHinomaruWalletContext();
  const { element, pl, optinalElement } = useLastTransactionElement(lastTransactionResult);

  return (
    <HStack className="flex-row items-center gap-x-0.5">
      <Text className="text-base leading-5 text-secondary-800">最終取引日時：</Text>
      <Text className="text-base leading-5 text-secondary-800 w-[103px]" style={{ paddingLeft: pl }}>
        {element}
        {optinalElement}
      </Text>
    </HStack>
  );
};

export default HomeLastTransactionAt;
