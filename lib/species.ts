/* eslint-disable @typescript-eslint/no-explicit-any */

import { SPECIES_DATABASE_ID } from "./constants";
import { NotionClient } from "./notion";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Species {
  id: string;
  phylum?: string;
  name?: string;
  picture?: string;
  coordinate: Coordinate;
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
  const species = res.results.map(
    (species: any) =>
      ({
        id: species.id,
        phylum: species.properties["Phylum"].select.name,
        name: species.properties["名前"].title[0].text.content,
        picture: species.properties["画像"].files[0].file.url,
        coordinate: {
          latitude: species.properties["緯度"].number,
          longitude: species.properties["経度"].number,
        },
      }) as Species,
  );
  return species;
}
