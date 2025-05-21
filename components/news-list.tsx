import Link from "next/link";
import { format } from "date-fns";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllNewsMetadata, NewsMetadata } from "@/lib/news";

export async function NewsList() {
  const news = await getAllNewsMetadata();

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      {news.map((news) => (
        <NewsListItem key={news.id} news={news} />
      ))}
    </div>
  );
}

function NewsListItem(props: { news: NewsMetadata }) {
  return (
    <Link href={`/news/${props.news.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{props.news.title}</CardTitle>
          <CardDescription>
            {format(props.news.date, "yyyy/MM/dd")}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
