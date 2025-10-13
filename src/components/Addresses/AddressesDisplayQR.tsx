import { setStringAsync } from "expo-clipboard";
import { useCallback, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { ContainButton } from "../Button";
import { BottomInputDrawer } from "../Drawer";
import QRCode from "../QRCode";

type AddressesDisplayQRProps = {
  name: string;
  address: Address;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const AddressesDisplayQR = (props: AddressesDisplayQRProps) => {
  const { name, address, componentProps } = props;

  const shareLinkRef = useRef<string>("");

  const handleShare = useCallback(() => {
    setStringAsync(shareLinkRef.current);
  }, []);

  return (
    <BottomInputDrawer {...componentProps}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <VStack className="flex-1 w-full items-center py-4 gap-y-6">
          <VStack className="w-full gap-y-2">
            <HStack className="gap-x-2">
              <Box className="w-1.5 bg-primary-500" />
              <Text className="font-bold">アドレス情報</Text>
            </HStack>
            <VStack className="border-[0.5px] border-secondary-300 px-5 py-6 bg-secondary-50 rounded-xl">
              <VStack className="gap-y-1">
                <Text className="font-bold text-secondary-600">名前</Text>
                <Text className="font-bold text-secondary-800 text-right">{name}</Text>
              </VStack>
              <VStack className="gap-y-1">
                <Text className="font-bold text-secondary-600">アドレス</Text>
                <Text className="font-bold text-secondary-800 text-right">{address}</Text>
              </VStack>
            </VStack>
          </VStack>
          <QRCode ref={shareLinkRef} path="addresses" query={{ name, address }} size={275} />
          <ContainButton text="共有" size="lg" className="w-full mt-auto" onPress={handleShare} />
        </VStack>
      </KeyboardAwareScrollView>
    </BottomInputDrawer>
  );
};

export default AddressesDisplayQR;
