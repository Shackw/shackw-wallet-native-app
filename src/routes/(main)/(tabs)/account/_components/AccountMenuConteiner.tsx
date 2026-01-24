import { AppText } from "@/presentation/components/AppText";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import type { ReactNode } from "react";

type AccountMenuConteinerProps = { title: string; children: ReactNode };

const AccountMenuConteiner = (props: AccountMenuConteinerProps) => {
  const { title, children } = props;

  const tw = useTw();

  return (
    <VStack className={cn("w-full", tw.gapY(1))}>
      <VStack className={cn("w-full", tw.gapY(2))}>
        <AppText className={cn(tw.ml(2), "font-bold")}>{title}</AppText>
        <Box className="w-full bg-secondary-200 h-[0.5px]" />
      </VStack>
      <VStack className={cn("w-full", tw.gapY(1))}>{children}</VStack>
    </VStack>
  );
};

export default AccountMenuConteiner;
