import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

const HomeMainBody = ({ children }: { children: React.ReactNode }) => {
  const tw = useTw();

  return (
    <Box className="w-full bg-white rounded-[8px] my-auto">
      <LinearGradient
        colors={[theme.colors.primary[50], "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 8 }}
      >
        <VStack className={cn("items-center", tw.gapY(4), tw.px(2), tw.pt(2), tw.pb(4))}>{children}</VStack>
      </LinearGradient>
    </Box>
  );
};

export default HomeMainBody;
