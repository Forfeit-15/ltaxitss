"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 1.3521, // Singapore Latitude
  lng: 103.8198, // Singapore Longitude
};

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    </GoogleMap>
  );
}
