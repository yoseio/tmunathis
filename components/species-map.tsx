"use client";

import { useState } from "react";
import Image from "next/image";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  NEXT_PUBLIC_MAPBOX_TOKEN,
  TMU_LATITUDE,
  TMU_LONGITUDE,
} from "@/lib/constants";
import { Species } from "@/lib/species";
import { MapPin } from "lucide-react";

export function SpeciesMap(props: { species: Species[] }) {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  return (
    <Map
      mapboxAccessToken={NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: TMU_LONGITUDE,
        latitude: TMU_LATITUDE,
        zoom: 14,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {props.species.map((species) => (
        <Marker
          key={species.id}
          longitude={species.coordinate.longitude}
          latitude={species.coordinate.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedSpecies(species);
          }}
        >
          <MapPin className="cursor-pointer size-[30px] text-red-600" />
        </Marker>
      ))}
      {selectedSpecies && (
        <Popup
          longitude={selectedSpecies.coordinate.longitude}
          latitude={selectedSpecies.coordinate.latitude}
          anchor="top"
          onClose={() => setSelectedSpecies(null)}
        >
          <div>
            <h3>{selectedSpecies.name}</h3>
            <Image
              width={150}
              height={150}
              src={selectedSpecies.picture}
              alt={selectedSpecies.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </Popup>
      )}
    </Map>
  );
}
