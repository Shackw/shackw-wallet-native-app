import { Home, Wallet, UserRoundCog, History, ArrowUpDown, Send, HandCoins } from "lucide-react-native";

import type { LucideIcon } from "lucide-react-native";

type BottomTabItemType = {
  name: string;
  icon: LucideIcon;
  label: string;
  path: string | undefined;
};

type BottomTabActionSheetItemType = BottomTabItemType & { description: string };

export type BottomTabName = (typeof BOTTOM_TAB_ITEMS)[number]["name"];

export const BOTTOM_TAB_ITEMS = [
  { name: "home", icon: Home, label: "ホーム", path: "/" },
  { name: "history", icon: History, label: "利用明細", path: "/history" },
  { name: "transfer", icon: ArrowUpDown, label: "送金支払", path: undefined },
  { name: "deposit", icon: Wallet, label: "預け入れ", path: "/deposit" },
  { name: "account", icon: UserRoundCog, label: "アカウント", path: "/account" }
] as const satisfies BottomTabItemType[];

export const BOTTOM_TAB_ACTION_SHEET_ITEMS = [
  {
    name: "transfer",
    icon: Send,
    label: "送信",
    description: "ステーブルコインを任意のアカウントに送信します。",
    path: "/transfer"
  },
  {
    name: "receive",
    icon: HandCoins,
    label: "受取",
    description: "金額を入力して支払い用のQRコードを作成します。",
    path: "/receive"
  }
] as const satisfies BottomTabActionSheetItemType[];
