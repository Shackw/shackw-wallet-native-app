import { Stack, Link } from "expo-router";

import { Button } from "@/gluestack/button";
import { Center } from "@/gluestack/center";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Center className="flex-1 px-4 bg-white">
        <VStack className="items-center gap-y-4">
          <Text className="text-2xl font-bold text-primary-500">この画面は存在しません</Text>
          <Text className="text-base text-secondary-800 text-center">
            アクセスしようとしたページが見つかりませんでした。
          </Text>
          <Link href="/" asChild>
            <Button className="h-11 px-4 bg-primary-500 rounded-[12px]">
              <Text className="text-white font-bold">ホームに戻る</Text>
            </Button>
          </Link>
        </VStack>
      </Center>
    </>
  );
};

export default NotFoundScreen;
