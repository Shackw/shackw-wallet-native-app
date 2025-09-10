import { Linking, Pressable } from "react-native";

import { Text } from "@/vendor/gluestack-ui/text";

type AnchorProps = { href: string } & React.ComponentProps<typeof Text>;

const Anchor = (props: AnchorProps) => {
  const { href, children, style, ...rest } = props;
  const handlePress = async () => {
    await Linking.openURL(href);
  };

  return (
    <Pressable onPress={handlePress} accessibilityRole="link">
      <Text {...rest} style={{ ...{ style }, textDecorationLine: "underline" }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Anchor;
