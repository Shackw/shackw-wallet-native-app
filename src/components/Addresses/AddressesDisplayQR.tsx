import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

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

  const handleShare = useCallback(() => {}, []);

  return (
    <BottomInputDrawer {...componentProps}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <VStack className="flex-1 w-full items-center justify-between py-4">
          <QRCode path="addresses" query={{ name, address }} size={250} />
          <ContainButton text="共有" size="lg" className="w-full" onPress={handleShare} />
        </VStack>
      </KeyboardAwareScrollView>
    </BottomInputDrawer>
  );
};

export default AddressesDisplayQR;
