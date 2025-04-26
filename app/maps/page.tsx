import { SpeciesMap } from "@/components/species-map";
import { getAllSpecies } from "@/lib/species";

export const revalidate = 60;

export default async function Page() {
  const species = await getAllSpecies();
  return <SpeciesMap species={species} />;
}
