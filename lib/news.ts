import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { MdBlock } from "notion-to-md/build/types";

import { NEWS_DATABASE_ID } from "./constants";
import {
  isCheckboxProperty,
  isDateProperty,
  isTitleProperty,
  Notion2MD,
  NotionClient,
} from "./notion";

export interface NewsMetadata {
  id: string;
  title: string;
  date: Date;
  published?: boolean;
}

function parseNewsMetadata(
  data: PageObjectResponse | DatabaseObjectResponse,
): NewsMetadata | null {
  const titleProperty = data.properties["タイトル"];
  const dateProperty = data.properties["日付"];
  const publishedProperty = data.properties["公開"];
  if (isTitleProperty(titleProperty) && isDateProperty(dateProperty) && isCheckboxProperty(publishedProperty)) {
    const id = data.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const title = (titleProperty.title as any)[0].text.content;
    const date = dateProperty.date?.start;
    const published = publishedProperty.checkbox;
    if (!title || !date) {
      return null;
    }
    return { id, title, date: new Date(date), published };
  } else {
    return null;
  }
}

export async function getAllNewsMetadata(): Promise<NewsMetadata[]> {
  const res = await NotionClient.databases.query({
    database_id: NEWS_DATABASE_ID,
    sorts: [
      {
        property: "日付",
        direction: "descending",
      },
    ],
  });
  const news = (res.results as DatabaseObjectResponse[])
    .map(parseNewsMetadata)
    .filter((item) => item !== null)
    .filter((item) => item.published);
  return news;
}

export async function getNewsMetadata(
  id: string,
): Promise<NewsMetadata | null> {
  const res = await NotionClient.pages.retrieve({
    page_id: id,
  });
  return parseNewsMetadata(res as PageObjectResponse);
}

export async function getNewsContents(id: string): Promise<MdBlock[]> {
  const markdown = await Notion2MD.pageToMarkdown(id);
  return markdown;
}
