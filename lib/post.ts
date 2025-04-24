import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { MdBlock } from "notion-to-md/build/types";

import { BLOG_DATABASE_ID } from "./constants";
import {
  DateProperty,
  isDateProperty,
  isTitleProperty,
  Notion2MD,
  NotionClient,
  TitleProperty,
} from "./notion";

export interface PostMetadata {
  id: string;
  title: string;
  date: Date;
}

function parsePostMetadata(
  data: PageObjectResponse | DatabaseObjectResponse,
): PostMetadata | null {
  const titleProperty = data.properties["タイトル"];
  const dateProperty = data.properties["日付"];
  if (isTitleProperty(titleProperty) && isDateProperty(dateProperty)) {
    const id = data.id;
    const title = (titleProperty as TitleProperty).title[0].text.content;
    if (!title) {
      return null;
    }
    const date = (dateProperty as DateProperty).date.start;
    if (!date) {
      return null;
    }
    return { id, title, date: new Date(date) };
  } else {
    return null;
  }
}

export async function getAllPostMetadata(): Promise<PostMetadata[]> {
  const res = await NotionClient.databases.query({
    database_id: BLOG_DATABASE_ID,
    sorts: [
      {
        property: "日付",
        direction: "descending",
      },
    ],
  });
  const posts = (res.results as DatabaseObjectResponse[])
    .map(parsePostMetadata)
    .filter((item) => item !== null) as PostMetadata[];
  return posts;
}

export async function getPostMetadata(
  id: string,
): Promise<PostMetadata | null> {
  const res = await NotionClient.pages.retrieve({
    page_id: id,
  });
  return parsePostMetadata(res as PageObjectResponse);
}

export async function getPostContents(id: string): Promise<MdBlock[]> {
  const markdown = await Notion2MD.pageToMarkdown(id);
  return markdown;
}
