import { Text, HStack } from "@gluestack-ui/themed";

import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

import useLastTransactionElement from "../_hooks/useLastTransactionElement";

const HomeLastTransactionAt = () => {
  const { lastTransactionResult } = useHinomaruWalletContext();
  const { element, pl, optinalElement } = useLastTransactionElement(lastTransactionResult);

  return (
    <HStack columnGap="$0.5" alignItems="center" pl="$10">
      <Text fontSize="$md" lineHeight="$sm" color="$secondary800">
        最終取引日時：
      </Text>
      <Text fontSize="$md" lineHeight="$sm" color="$secondary800" w={103} pl={pl}>
        {element}
        {optinalElement}
      </Text>
    </HStack>
  );
};

export default HomeLastTransactionAt;
