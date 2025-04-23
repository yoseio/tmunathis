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

export function CampusMap(props: { species: Species[] }) {
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
          <div
            style={{
              cursor: "pointer",
              background: "brown",
              borderRadius: "50%",
              width: "10px",
              height: "10px",
            }}
          />
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
            <p>Phylum: {selectedSpecies.phylum}</p>
            <Image
              width={150}
              height={150}
              src={selectedSpecies.picture}
              alt={selectedSpecies.name}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        </Popup>
      )}
    </Map>
  );
}
