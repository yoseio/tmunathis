import { PostList } from "@/components/post-list";

export const revalidate = 60;

export default function Page() {
  return <PostList />;
}
