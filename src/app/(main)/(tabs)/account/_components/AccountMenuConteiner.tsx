import { ReactNode } from "react";

import { Box } from "@/presentation/components/gluestack-ui/box";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

type AccountMenuConteinerProps = { title: string; children: ReactNode };

const AccountMenuConteiner = (props: AccountMenuConteinerProps) => {
  const { title, children } = props;

  return (
    <VStack className="w-full gap-y-1">
      <VStack className="w-full gap-y-2">
        <Text size="lg" className="ml-2 font-bold">
          {title}
        </Text>
        <Box className="w-full bg-secondary-300 h-[0.5px]" />
      </VStack>
      <VStack className="w-full gap-y-1">{children}</VStack>
    </VStack>
  );
};

export default AccountMenuConteiner;
