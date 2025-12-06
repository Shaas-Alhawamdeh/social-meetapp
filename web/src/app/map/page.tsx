"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

export default function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;
  if (!userLocation) return <div>Retrieving your location...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={14}>
      <Marker position={userLocation} />
    </GoogleMap>
  );
}
