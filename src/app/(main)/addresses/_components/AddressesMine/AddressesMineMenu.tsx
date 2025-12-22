import { setStringAsync } from "expo-clipboard";
import { Copy, EllipsisVertical, QrCode, SquarePen } from "lucide-react-native";
import { useCallback } from "react";
import { Address } from "viem";

import { IconButton } from "@/presentation/components/Button";
import { Icon } from "@/presentation/components/gluestack-ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/presentation/components/gluestack-ui/menu";
import { useAddressesRow } from "@/presentation/hooks/useAddressesRow";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { theme } from "@/presentation/styles/theme";
import AddressesDisplayQR from "@mainc/addresses/AddressesDisplayQR";

import AddressesMineEditField from "./AddressesMineEditField";

type AddressesMineMenuProps = {
  address: Address;
  name: string;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesMineMenu = (props: AddressesMineMenuProps) => {
  const { address, name, refetchAddresses } = props;
  const [isEditing, setIsEditing] = useBoolean(false);
  const [isDisplayQr, setIsDisplayQr] = useBoolean(false);

  const handleCopy = useCallback(() => {
    setStringAsync(address);
  }, [address]);

  return (
    <>
      <Menu
        placement="left top"
        offset={5}
        className="bg-secondary-50"
        trigger={({ ...triggerProps }) => {
          return (
            <IconButton
              defaultProps={triggerProps}
              action="default"
              className="ml-auto"
              iconSize={25}
              icon={EllipsisVertical}
              iconColor={theme.colors.secondary[700]}
            />
          );
        }}
      >
        <MenuItem key="Edit Profile" textValue="編集" onPress={setIsEditing.on}>
          <Icon as={SquarePen} size="md" className="mr-2" />
          <MenuItemLabel size="md" className="font-bold">
            編集
          </MenuItemLabel>
        </MenuItem>
        <MenuItem key="Disply QR" textValue="QRコードを表示" onPress={setIsDisplayQr.on}>
          <Icon as={QrCode} size="md" className="mr-2" />
          <MenuItemLabel size="md" className="font-bold">
            QRコードを表示
          </MenuItemLabel>
        </MenuItem>
        <MenuItem key="Copy Address" textValue="アドレスをコピー" onPress={handleCopy}>
          <Icon as={Copy} size="md" className="mr-2" />
          <MenuItemLabel size="md" className="font-bold">
            アドレスをコピー
          </MenuItemLabel>
        </MenuItem>
      </Menu>

      <AddressesMineEditField
        key={`edit-mine:${address}`}
        address={address}
        name={name}
        refetchAddresses={refetchAddresses}
        componentProps={{
          title: "プロフィールの編集",
          size: "lg",
          isOpen: isEditing,
          onClose: setIsEditing.off
        }}
      />

      <AddressesDisplayQR
        key={`qr-mine:${address}`}
        address={address}
        name={name}
        componentProps={{
          title: "プロフィールの共有",
          size: "lg",
          isOpen: isDisplayQr,
          onClose: setIsDisplayQr.off
        }}
      />
    </>
  );
};

export default AddressesMineMenu;
