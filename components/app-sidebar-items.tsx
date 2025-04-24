import {
  IconBook2,
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
  { title: "ブログ", url: "/posts", icon: IconNews },
  { title: "図鑑", url: "/dictionary", icon: IconBook2 },
  { title: "貝殻シミュレータ", url: "/seashell", icon: IconSquareRoot2 },
];
