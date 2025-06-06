import Link from "next/link";
import { format } from "date-fns";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPostMetadata, PostMetadata } from "@/lib/post";

export async function PostList() {
  const posts = await getAllPostMetadata();

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostListItem(props: { post: PostMetadata }) {
  return (
    <Link href={`/posts/${props.post.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{props.post.title}</CardTitle>
          <CardDescription>
            {format(props.post.date, "yyyy/MM/dd")}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
