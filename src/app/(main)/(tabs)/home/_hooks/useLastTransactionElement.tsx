import { Spinner, Icon, Box, Text } from "@gluestack-ui/themed";
import { UseQueryResult } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react-native";
import { useCallback, useMemo } from "react";
import { Pressable } from "react-native";

import { TransactionModel } from "@/models/transaction";
import { formatUnixTimestampToJST } from "@/utils/datetime";

type LastTransactionElementProps = {
  element: React.ReactNode;
  pl: React.ComponentProps<typeof Text>["pl"];
  optinalElement?: React.ReactNode;
};

const useLastTransactionElement = (
  lastTransactionResult: UseQueryResult<TransactionModel | null | undefined>
): LastTransactionElementProps => {
  const { data: lastTransaction, isLoading, isError, refetch } = lastTransactionResult;

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  const lastTransactionElement = useMemo<LastTransactionElementProps>(() => {
    if (isError)
      return {
        element: "取得失敗",
        pl: "$0",
        optinalElement: (
          <Box pl="$2">
            <Pressable onPress={handleRefetch}>
              <Icon as={RefreshCcw} color="$secondary400" size="md" />
            </Pressable>
          </Box>
        )
      };
    if (lastTransaction === undefined || isLoading)
      return { element: <Spinner size={16} color="$secondary400" />, pl: "$5" };
    if (lastTransaction === null)
      return {
        element: "ー",
        pl: "$5"
      };
    return { element: formatUnixTimestampToJST(lastTransaction.timestamp), pl: "$0" };
  }, [handleRefetch, isError, isLoading, lastTransaction]);

  return lastTransactionElement;
};

export default useLastTransactionElement;
