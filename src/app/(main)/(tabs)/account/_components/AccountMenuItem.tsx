import { ComponentProps } from "react";
import { Pressable } from "react-native";

import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

type AccountMenuItemProps = ComponentProps<typeof Pressable>;

const AccountMenuItem = (props: AccountMenuItemProps) => {
  const { children, className, ...rest } = props;

  const tw = useTw();

  return (
    <Pressable
      {...rest}
      className={cn("w-full bg-secondary-50 rounded-lg active:bg-secondary-100", tw.px(4), tw.py(6), className)}
    >
      {children}
    </Pressable>
  );
};

export default AccountMenuItem;
