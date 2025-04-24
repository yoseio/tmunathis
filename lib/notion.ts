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

export type SelectProperty = {
  type: "select";
  select: {
    options: Array<{
      id: string;
      name: string;
      color: string;
      description: string | null;
    }>;
  };
  id: string;
  name: string;
  description: string | null;
};

export function isSelectProperty(
  property: unknown,
): property is SelectProperty {
  return (
    typeof property === "object" && property !== null && "select" in property
  );
}

export type NumberProperty = {
  type: "number";
  number: {
    format: string;
  };
  id: string;
  name: string;
  description: string | null;
};

export function isNumberProperty(
  property: unknown,
): property is NumberProperty {
  return (
    typeof property === "object" && property !== null && "number" in property
  );
}

export type FilesProperty = {
  type: "files";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: Record<string, any>[];
  id: string;
  name: string;
  description: string | null;
};

export function isFilesProperty(property: unknown): property is FilesProperty {
  return (
    typeof property === "object" && property !== null && "files" in property
  );
}
