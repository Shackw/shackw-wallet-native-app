import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { useLastTransactionContext } from "@/presentation/providers/LastTransactionProvider";

import useLastTransactionElement from "../_hooks/useLastTransactionElement";

const HomeLastTransactionAt = () => {
  const queryResult = useLastTransactionContext();
  const { element, pl, optinalElement } = useLastTransactionElement(queryResult);

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
