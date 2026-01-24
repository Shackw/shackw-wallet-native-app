import { AppText } from "@/presentation/components/AppText";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";
import { cn } from "@/shared/helpers/cn";

import { useTw } from "../styles/tw";

import type { ReactNode } from "react";

type TableSuspenceProps<T> = {
  title: string;
  rows: T[] | undefined;
  isError: boolean;
  loadingMessage?: string;
  children: (rows: T[]) => ReactNode;
};

const TableSuspence = <T extends object>(props: TableSuspenceProps<T>) => {
  const { title, rows, isError, loadingMessage, children } = props;

  const tw = useTw();

  if (!rows && isError)
    return (
      <VStack className={cn("flex-1", "justify-center", "items-center", "pb-[15%]")}>
        <AppText t="md" className="font-bold text-secondary-500">
          エラーが発生しました
        </AppText>
      </VStack>
    );

  if (!rows)
    return (
      <VStack className={cn("flex-1", "justify-center", "items-center", "pb-[15%]", "gap-y-2")}>
        <Spinner color={theme.colors.primary[400]} size={tw.scaleNum(35)} />
        {loadingMessage && (
          <AppText t="md" className="font-bold text-secondary-500 whitespace-pre text-center">
            {loadingMessage}
          </AppText>
        )}
      </VStack>
    );

  if (rows.length === 0)
    return (
      <VStack className={cn("flex-1", "justify-center", "items-center", "pb-[15%]")}>
        <AppText t="md" className="font-bold text-secondary-500">
          {`${title}がありません`}
        </AppText>
      </VStack>
    );

  return children(rows);
};

export default TableSuspence;
