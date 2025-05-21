import { NewsList } from "@/components/news-list";

export const revalidate = 60;

export default function Page() {
  return <NewsList />;
}
