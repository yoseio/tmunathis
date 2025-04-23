import ReactMarkdown from "react-markdown";

import { getAllPostMetadata, getPostContents } from "@/lib/post";

export async function generateStaticParams() {
  const posts = await getAllPostMetadata();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const contents = await getPostContents(slug);

  return (
    <div className="px-4 lg:px-6">
      {contents.map((content) => (
        <ReactMarkdown key={content.blockId}>{content.parent}</ReactMarkdown>
      ))}
    </div>
  );
}
