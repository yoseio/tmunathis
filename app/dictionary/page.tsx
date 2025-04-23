import { CampusMap } from "@/components/campus-map";
import { getAllSpecies } from "@/lib/species";

export default async function Page() {
  const species = await getAllSpecies();
  return <CampusMap species={species} />;
}
