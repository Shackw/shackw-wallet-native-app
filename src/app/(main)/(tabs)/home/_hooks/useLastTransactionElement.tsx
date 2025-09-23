import { UseQueryResult } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react-native";
import React, { useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";

import { formatIsoString } from "@/helpers/datetime";
import { TransactionModel } from "@/models/transaction";
import { theme } from "@/styles/theme";
import { Spinner } from "@/vendor/gluestack-ui/spinner";

type LastTransactionElementProps = {
  element: React.ReactNode;
  pl: number;
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
    if (isError) {
      return {
        element: "取得失敗",
        pl: 0,
        optinalElement: (
          <View style={{ paddingLeft: 8 }}>
            <Pressable onPress={handleRefetch} accessibilityRole="button">
              <RefreshCcw size={20} color={theme.colors.secondary[400]} />
            </Pressable>
          </View>
        )
      };
    }

    if (lastTransaction === undefined || isLoading) {
      return {
        element: <Spinner size={16} color={theme.colors.secondary[500]} />,
        pl: 20
      };
    }

    if (lastTransaction === null) {
      return {
        element: "ー",
        pl: 20
      };
    }

    return {
      element: formatIsoString(lastTransaction.transferredAt),
      pl: 0
    };
  }, [handleRefetch, isError, isLoading, lastTransaction]);

  return lastTransactionElement;
};

export default useLastTransactionElement;
