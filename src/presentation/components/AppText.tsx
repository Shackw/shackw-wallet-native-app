import React from "react";

import { Text } from "@/presentation/components/gluestack-ui/text";
import { cn } from "@/shared/helpers/cn";

import { TextToken } from "../styles/density";
import { useTw } from "../styles/tw";

type Props = Omit<React.ComponentProps<typeof Text>, "size"> & {
  t?: TextToken;
  oneLine?: boolean;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
};

export const AppText = ({ t = "md", oneLine = false, ellipsizeMode = "tail", className, ...props }: Props) => {
  const tw = useTw();

  return (
    <Text
      {...props}
      {...(oneLine
        ? {
            numberOfLines: 1,
            ellipsizeMode
          }
        : {})}
      className={cn(tw.text(t), className)}
    />
  );
};
