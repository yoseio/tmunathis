import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import { NOTION_TOKEN } from "./constants";

export const NotionClient = new Client({
  auth: NOTION_TOKEN,
});

export const Notion2MD = new NotionToMarkdown({
  notionClient: NotionClient,
});

export type TitleProperty = {
  type: "title";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: Record<string, any>;
  id: string;
  name: string;
  description: string | null;
};

export function isTitleProperty(property: unknown): property is TitleProperty {
  return (
    typeof property === "object" && property !== null && "title" in property
  );
}

export type DateProperty = {
  type: "date";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: Record<string, any>;
  id: string;
  name: string;
  description: string | null;
};

export function isDateProperty(property: unknown): property is DateProperty {
  return (
    typeof property === "object" && property !== null && "date" in property
  );
}
