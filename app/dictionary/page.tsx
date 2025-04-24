import { CampusMap } from "@/components/campus-map";
import { getAllSpecies } from "@/lib/species";

export const revalidate = 60;

export default async function Page() {
  const species = await getAllSpecies();
  return <CampusMap species={species} />;
}
