import { ReactNode } from "react";

import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";

type TableSuspenceProps<T> = {
  title: string;
  rows: T[] | undefined;
  isError: boolean;
  loadingMessage?: string;
  children: (rows: T[]) => ReactNode;
};

const TableSuspence = <T extends object>(props: TableSuspenceProps<T>) => {
  const { title, rows, isError, loadingMessage, children } = props;

  if (!rows && isError)
    return (
      <VStack className="flex-1 justify-center items-center pb-[15%]">
        <Text className="font-bold text-secondary-500">エラーが発生しました</Text>
      </VStack>
    );

  if (!rows)
    return (
      <VStack className="flex-1 justify-center items-center pb-[15%] gap-y-2">
        <Spinner color={theme.colors.primary[400]} size={34.3} />
        {loadingMessage && (
          <Text className="font-bold text-secondary-500 whitespace-pre text-center">{loadingMessage}</Text>
        )}
      </VStack>
    );

  if (rows.length === 0)
    return (
      <VStack className="flex-1 justify-center items-center pb-[15%]">
        <Text className="font-bold text-secondary-500">{`${title}がありません`}</Text>
      </VStack>
    );

  return children(rows);
};

export default TableSuspence;
