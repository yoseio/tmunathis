import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Species } from "@/lib/species";

function SpeciesListItem(props: { species: Species }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {props.species.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={props.species.picture}
          alt={props.species.name}
          width={300}
          height={300}
          className="rounded-md size-full"
        />
      </CardContent>
    </Card>
  )
}

export function SpeciesList(props: { species: Species[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {props.species.map((species) => (
        <SpeciesListItem key={species.id} species={species} />
      ))}
    </div>
  );
}
