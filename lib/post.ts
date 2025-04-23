import { MdBlock } from "notion-to-md/build/types";

import { DATABASE_ID } from "./constants";
import { Notion2MD, NotionClient } from "./notion";

export interface PostMetadata {
  id: string;
  title: string;
  date: Date;
}

export async function getAllPostMetadata(): Promise<PostMetadata[]> {
  const res = await NotionClient.databases.query({
    database_id: DATABASE_ID,
    sorts: [
      {
        property: "日付",
        direction: "descending",
      },
    ],
  });
  const posts = res.results.map(
    (post: any) =>
      ({
        id: post.id,
        title: post.properties.タイトル.title[0].text.content,
        date: new Date(post.properties.日付.date.start),
      }) as PostMetadata,
  );
  return posts;
}

export async function getPostMetadata(id: string): Promise<PostMetadata> {
  const res = await NotionClient.pages.retrieve({
    page_id: id,
  });
  const post = {
    id: res.id,
    title: (res as any).properties.タイトル.title[0].text.content,
    date: new Date((res as any).properties.日付.date.start),
  } as PostMetadata;
  return post;
}

export async function getPostContent(id: string): Promise<MdBlock[]> {
  const markdown = await Notion2MD.pageToMarkdown(id);
  return markdown;
}
