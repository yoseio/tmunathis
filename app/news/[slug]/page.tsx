import ReactMarkdown from "react-markdown";

import { getAllNewsMetadata, getNewsContents } from "@/lib/news";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const news = await getAllNewsMetadata();
  return news.map((news) => ({
    slug: news.id,
  }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const contents = await getNewsContents(slug);

  return (
    <div className="px-4 lg:px-6">
      {contents.map((content) => (
        <ReactMarkdown key={content.blockId}>{content.parent}</ReactMarkdown>
      ))}
    </div>
  );
}
