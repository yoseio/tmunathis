import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { SPECIES_DATABASE_ID } from "./constants";
import {
  isFilesProperty,
  isNumberProperty,
  isTitleProperty,
  NotionClient,
} from "./notion";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Species {
  id: string;
  name: string;
  picture: string;
  coordinate: Coordinate;
}

function parseSpecies(data: DatabaseObjectResponse): Species | null {
  const nameProperty = data.properties["名前"];
  const pictureProperty = data.properties["画像"];
  const latitudeProperty = data.properties["緯度"];
  const longitudeProperty = data.properties["経度"];
  if (
    isTitleProperty(nameProperty) &&
    isFilesProperty(pictureProperty) &&
    isNumberProperty(latitudeProperty) &&
    isNumberProperty(longitudeProperty)
  ) {
    const id = data.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const name = (nameProperty.title[0] as any).text.content;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const picture = (pictureProperty.files[0] as any).file.url;
    const latitude = latitudeProperty.number;
    const longitude = longitudeProperty.number;
    if (!name || !picture || !latitude || !longitude) {
      return null;
    }
    return {
      id,
      name,
      picture,
      coordinate: { latitude, longitude },
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
