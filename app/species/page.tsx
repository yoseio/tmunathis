import { SpeciesList } from "@/components/species-list";
import { getAllSpecies } from "@/lib/species";

export const revalidate = 60;

export default async function Page() {
  const species = await getAllSpecies();
  return <SpeciesList species={species} />;
}
