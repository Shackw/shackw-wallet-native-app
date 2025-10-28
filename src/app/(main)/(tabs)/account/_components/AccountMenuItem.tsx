import { ComponentProps } from "react";
import { Pressable } from "react-native";

type AccountMenuItemProps = ComponentProps<typeof Pressable>;

const AccountMenuItem = (props: AccountMenuItemProps) => {
  const { children, className, ...rest } = props;

  return (
    <Pressable {...rest} className={`w-full px-4 py-6 bg-secondary-50 rounded-lg ${className}`}>
      {children}
    </Pressable>
  );
};

export default AccountMenuItem;
