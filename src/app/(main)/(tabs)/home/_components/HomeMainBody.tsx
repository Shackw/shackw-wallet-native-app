import { Box, VStack, useToken } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";

const HomeMainBody = ({ children }: { children: React.ReactNode }) => {
  const colorStart = useToken<"colors">("colors", "primary50");
  const colorEnd = useToken<"colors">("colors", "white");

  return (
    <Box top="35%" w="100%" position="absolute" bg="white" rounded={8}>
      <LinearGradient
        colors={[colorStart, colorEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 8, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 16 }}
      >
        <VStack alignItems="center" rowGap="$4">
          {children}
        </VStack>
      </LinearGradient>
    </Box>
  );
};

export default HomeMainBody;
