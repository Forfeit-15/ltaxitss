"use client";

import {
  GoogleMap,
  OverlayView,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useCallback } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { markers } from "@/data/markers";
import { FaLocationArrow } from "react-icons/fa"; // ✅ Icon for markers

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 100px)", // Adjust to fit your layout
};

const center = { lat: 1.3521, lng: 103.8198 }; // Singapore

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {}, []);

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

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
            {/* 🟢 Custom React Icon Marker */}
            <OverlayView
              position={marker.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="relative flex items-center justify-center">
                {/* Pulse Animation */}
                <span
                  className={`
                    absolute inline-flex h-6 w-6 rounded-full animate-ping opacity-75
                    ${marker.status === "congested" ? "bg-red-400" : "bg-green-400"}
                  `}
                />
                {/* React Icon */}
                <div
                  className="z-20 flex items-center justify-center w-8 h-8"
                  onClick={() => setActiveMarker(marker.id)}
                  style={{ transform: `rotate(${marker.degrees - 45}deg)` }}
                >
                  <FaLocationArrow
                    className={`
                      text-3xl transition-transform duration-200
                      ${marker.status === "congested" ? "text-red-600" : "text-green-500"}
                      hover:scale-125 active:scale-90 cursor-pointer
                    `}
                  />
                </div>
              </div>
            </OverlayView>

            {/* 🟡 Popover */}
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
