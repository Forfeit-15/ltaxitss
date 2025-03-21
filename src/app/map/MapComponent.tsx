"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { markers } from "@/data/markers"; 

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 1.3521, lng: 103.8198 }; // Singapore (Main Center)

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

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
        {/* Loop through markers and create popups */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: marker.status === "congested" ? "red" : "green",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white",
            }}
            onClick={() => setActiveMarker(marker.id)}
          />
        ))}
      </GoogleMap>

      {/* Display popovers when a marker is clicked */}
      {markers.map((marker) =>
        activeMarker === marker.id ? (
          <div
            key={marker.id}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Popover open={true} onOpenChange={() => setActiveMarker(null)}>
              <PopoverTrigger asChild>
                <button className="w-4 h-4 bg-gray-700 rounded-full border-2 border-white" />
              </PopoverTrigger>
              <PopoverContent className="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64">
                <p className="font-bold text-lg">{marker.location}</p>
                <p className="text-sm text-gray-400">Last Updated: {marker.lastUpdated}</p>
                <p className="mt-1">🚗 Vehicles Detected: <span className="font-bold">{marker.vehiclesDetected}</span></p>
                <p className="mt-1">🏎️ Car Speed: <span className="font-bold">{marker.carSpeed}</span></p>
                {marker.status === "congested" && (
                  <p className="mt-2 text-red-400">⚠️ <strong>Recommended Actions:</strong> {marker.action}</p>
                )}
              </PopoverContent>
            </Popover>
          </div>
        ) : null
      )}
    </div>
  );
}
