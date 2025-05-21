import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import { NOTION_TOKEN } from "./constants";
import {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const NotionClient = new Client({
  auth: NOTION_TOKEN,
});

export const Notion2MD = new NotionToMarkdown({
  notionClient: NotionClient,
});

// -----------------------------------------------------------------------------

export function isTitleProperty(
  property: unknown,
): property is TitlePropertyItemObjectResponse {
  return (
    typeof property === "object" && property !== null && "title" in property
  );
}

export function isDateProperty(
  property: unknown,
): property is DatePropertyItemObjectResponse {
  return (
    typeof property === "object" && property !== null && "date" in property
  );
}

export function isNumberProperty(
  property: unknown,
): property is NumberPropertyItemObjectResponse {
  return (
    typeof property === "object" && property !== null && "number" in property
  );
}

export function isFilesProperty(
  property: unknown,
): property is FilesPropertyItemObjectResponse {
  return (
    typeof property === "object" && property !== null && "files" in property
  );
}

export function isCheckboxProperty(
  property: unknown
): property is CheckboxPropertyItemObjectResponse {
  return (
    typeof property === "object" && property !== null && "checkbox" in property
  );
}
