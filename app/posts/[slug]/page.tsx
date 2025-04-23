import ReactMarkdown from "react-markdown";

import { getPostContents } from "@/lib/post";

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
