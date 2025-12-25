import { AppText } from "@/presentation/components/AppText";
import {
  Drawer as GlueStackUiDrawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader
} from "@/presentation/components/gluestack-ui/drawer";
import { CloseIcon, Icon } from "@/presentation/components/gluestack-ui/icon";

type DrawerProps = { title: string } & React.ComponentProps<typeof GlueStackUiDrawer>;

export const BottomActionSheet = (props: Omit<DrawerProps, "anchor">) => {
  const { title, children, ...rest } = props;

  return (
    <GlueStackUiDrawer {...rest} anchor="bottom">
      <DrawerBackdrop />
      <DrawerContent className="rounded-t-2xl">
        <DrawerHeader className="relative">
          <AppText t="lg" className="font-bold text-center w-full">
            {title}
          </AppText>
          <DrawerCloseButton className="absolute right-0">
            <Icon as={CloseIcon} size="xl" />
          </DrawerCloseButton>
        </DrawerHeader>
        <DrawerBody contentContainerStyle={{ flex: 1 }}>{children}</DrawerBody>
      </DrawerContent>
    </GlueStackUiDrawer>
  );
};
