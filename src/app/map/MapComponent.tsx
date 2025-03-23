"use client";

import {
  GoogleMap,
  Marker,
  OverlayView,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useCallback } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { markers } from "@/data/markers"; // ✅ Ensure correct path

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 1.3521, lng: 103.8198 }; // Singapore center

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {}, []);

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  const getRotation = (dir: string | undefined) => {
    switch (dir) {
      case "up":
        return 0;
      case "right":
        return 90;
      case "down":
        return 180;
      case "left":
        return 270;
      default:
        return 0;
    }
  };

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
      >
        {markers.map((marker) => (
          <div key={marker.id}>
            {/* Directional Marker */}
            <Marker
              position={marker.position}
              icon={{
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 4,
                fillColor:
                  marker.status === "congested" ? "red" : "green",
                fillOpacity: 1,
                strokeWeight: 1,
                rotation: getRotation(marker.direction),
              }}
              onClick={() => setActiveMarker(marker.id)}
            />

            {/* Popup */}
            {activeMarker === marker.id && (
              <OverlayView
                position={marker.position}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="relative">
                  <Popover open={true} onOpenChange={() => setActiveMarker(null)}>
                    <PopoverTrigger asChild>
                      <button className="w-0 h-0 opacity-0 absolute" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64">
                      <p className="font-bold text-lg">{marker.location}</p>
                      <p className="text-sm text-gray-400">
                        Last Updated: {marker.lastUpdated}
                      </p>
                      <p className="mt-1">
                        🚗 Vehicles Detected:{" "}
                        <span className="font-bold">{marker.vehiclesDetected}</span>
                      </p>
                      <p className="mt-1">
                        🏎️ Car Speed:{" "}
                        <span className="font-bold">{marker.carSpeed}</span>
                      </p>
                      {marker.status === "congested" && (
                        <p className="mt-2 text-red-400">
                          ⚠️ <strong>Recommended Actions:</strong>{" "}
                          {marker.action}
                        </p>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </OverlayView>
            )}
          </div>
        ))}
      </GoogleMap>
    </div>
  );
}
