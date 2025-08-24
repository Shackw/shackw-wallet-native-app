import { Text, VStack, Button, Center } from "@gluestack-ui/themed";
import { Stack, Link } from "expo-router";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Center flex={1} px="$4" bg="white">
        <VStack space="md" alignItems="center">
          <Text size="2xl" fontWeight="bold" color="$primary500">
            この画面は存在しません
          </Text>
          <Text size="md" color="$secondary800" textAlign="center">
            アクセスしようとしたページが見つかりませんでした。
          </Text>
          <Link href="/" asChild>
            <Button size="md" bg="$primary500" borderRadius="$xl">
              <Text color="white" fontWeight="bold">
                ホームに戻る
              </Text>
            </Button>
          </Link>
        </VStack>
      </Center>
    </>
  );
};

export default NotFoundScreen;
