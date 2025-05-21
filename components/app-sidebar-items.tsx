import {
  IconBlockquote,
  IconButterfly,
  IconMapRoute,
  IconNews,
  IconSquareRoot2,
  type Icon,
} from "@tabler/icons-react";

interface AppSidebarItems {
  title: string;
  url: string;
  icon: Icon;
}

export const AppSidebarItems: AppSidebarItems[] = [
  { title: "お知らせ", url: "/news", icon: IconNews },
  { title: "ブログ", url: "/posts", icon: IconBlockquote },
  { title: "図鑑", url: "/species", icon: IconButterfly },
  { title: "地図", url: "/maps", icon: IconMapRoute },
  { title: "貝殻シミュレータ", url: "/seashell", icon: IconSquareRoot2 },
];
