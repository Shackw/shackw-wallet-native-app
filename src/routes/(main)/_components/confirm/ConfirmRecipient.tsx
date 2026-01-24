import { AppText } from "@/presentation/components/AppText";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import type { Address } from "viem";

type ConfirmAddressProps = {
  title: string;
  name: string | undefined;
  address: Address;
};

const ConfirmRecipient = (props: ConfirmAddressProps) => {
  const { title, name, address } = props;

  const tw = useTw();

  return (
    <VStack className={cn("w-full", tw.gapY(2))}>
      <HStack className={cn(tw.gapX(2))}>
        <Box className={cn(tw.w(1.5), "bg-primary-500")} />
        <AppText t="md" className="font-bold">
          {title}
        </AppText>
      </HStack>

      <VStack className={cn("bg-secondary-50 rounded-xl border-[0.5px] border-secondary-300", tw.p(4))}>
        {name && (
          <VStack className={cn(tw.gapY(1))}>
            <AppText t="sm" className="font-bold text-secondary-600">
              名前
            </AppText>
            <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
              {name}
            </AppText>
          </VStack>
        )}

        <VStack className={cn(tw.gapY(1))}>
          <AppText t="sm" className="font-bold text-secondary-600">
            アドレス
          </AppText>
          <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
            {address}
          </AppText>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ConfirmRecipient;
