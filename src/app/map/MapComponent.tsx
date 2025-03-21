"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 1.3521, lng: 103.8198 }; // Singapore

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="relative">
      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Google Maps Marker with Click Event */}
        <Marker position={center} onClick={() => setIsPopoverOpen(true)} />
      </GoogleMap>

      {/* Popover Positioned Over the Marker */}
      {isPopoverOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
            </PopoverTrigger>
            <PopoverContent className="bg-white p-3 shadow-lg">
              <p>📍 This is the center of Singapore!</p>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
