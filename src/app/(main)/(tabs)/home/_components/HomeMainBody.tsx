import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";

const HomeMainBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="absolute w-full bg-white rounded-[8px]" style={{ top: "35%" }}>
      <LinearGradient
        colors={[theme.colors.primary[50], "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 8 }}
      >
        <VStack className="items-center gap-y-4 px-2 pt-2 pb-4">{children}</VStack>
      </LinearGradient>
    </Box>
  );
};

export default HomeMainBody;
