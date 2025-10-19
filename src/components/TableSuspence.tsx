import { ReactNode } from "react";

import { theme } from "@/styles/theme";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type TableSuspenceProps<T> = {
  title: string;
  rows: T[] | undefined;
  isError: boolean;
  children: (rows: T[]) => ReactNode;
};

const TableSuspence = <T extends object>(props: TableSuspenceProps<T>) => {
  const { title, rows, isError, children } = props;

  if (!rows && isError)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Text className="font-bold text-secondary-500">エラーが発生しました</Text>
      </VStack>
    );

  if (!rows)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Spinner color={theme.colors.primary[400]} size={34.3} />
      </VStack>
    );

  if (rows.length === 0)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Text className="font-bold text-secondary-500">{`${title}がありません`}</Text>
      </VStack>
    );

  return children(rows);
};

export default TableSuspence;
