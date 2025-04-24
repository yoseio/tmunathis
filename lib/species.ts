import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { SPECIES_DATABASE_ID } from "./constants";
import {
  FilesProperty,
  isFilesProperty,
  isNumberProperty,
  isSelectProperty,
  isTitleProperty,
  NotionClient,
  NumberProperty,
  SelectProperty,
  TitleProperty,
} from "./notion";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Species {
  id: string;
  phylum: string;
  name: string;
  picture: string;
  coordinate: Coordinate;
}

function parseSpecies(data: DatabaseObjectResponse): Species | null {
  const phylumProperty = data.properties["Phylum"];
  const nameProperty = data.properties["名前"];
  const pictureProperty = data.properties["画像"];
  const latitudeProperty = data.properties["緯度"];
  const longitudeProperty = data.properties["経度"];
  if (
    isSelectProperty(phylumProperty) &&
    isTitleProperty(nameProperty) &&
    isFilesProperty(pictureProperty) &&
    isNumberProperty(latitudeProperty) &&
    isNumberProperty(longitudeProperty)
  ) {
    const id = data.id;
    const phylum = (phylumProperty as SelectProperty).select.options[0].name;
    const name = (nameProperty as TitleProperty).title[0].text.content;
    const picture = (pictureProperty as FilesProperty).files[0].file.url;
    const latitude = (latitudeProperty as NumberProperty).number;
    const longitude = (longitudeProperty as NumberProperty).number;
    if (!phylum || !name || !picture || !latitude || !longitude) {
      return null;
    }
    return {
      id,
      phylum,
      name,
      picture,
      coordinate: { latitude: Number(latitude), longitude: Number(longitude) },
    };
  }
  return null;
}

export async function getAllSpecies(): Promise<Species[]> {
  const res = await NotionClient.databases.query({
    database_id: SPECIES_DATABASE_ID,
    sorts: [
      {
        property: "名前",
        direction: "descending",
      },
    ],
  });
  const species = (res.results as DatabaseObjectResponse[])
    .map(parseSpecies)
    .filter((item) => item !== null) as Species[];
  return species;
}
