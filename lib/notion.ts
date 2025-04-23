import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import { NOTION_TOKEN } from "./constants";

export const NotionClient = new Client({
  auth: NOTION_TOKEN,
});

export const Notion2MD = new NotionToMarkdown({
  notionClient: NotionClient,
});
