import { AppBarProps } from "..";

import DefaultAppBarBody from "./DefaultAppBarBody";
import OverlayAppBarBody from "./OverlayAppBarBody";

const AppBarBody = ({ title }: AppBarProps) => {
  if (title) return <OverlayAppBarBody title={title} />;
  return <DefaultAppBarBody />;
};

export default AppBarBody;
