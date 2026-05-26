"use client";
import { useApp } from "@/context/AppContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function MapPage() {
  const { rides } = useApp();
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapReady) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, { zoomControl: false }).setView(
        [12.9231, 77.4987], 12
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      // destination marker (college)
      const destIcon = L.divIcon({
        html: `<div style="background:#7c3aed;color:white;padding:4px 8px;border-radius:8px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.2)">RV College</div>`,
        className: "",
        iconAnchor: [40, 10],
      });
      L.marker([12.9231, 77.4987], { icon: destIcon }).addTo(map);

      // ride markers
      rides.forEach((ride) => {
        const rideIcon = L.divIcon({
          html: `<div style="background:white;border:2px solid #7c3aed;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7c3aed;box-shadow:0 2px 8px rgba(0,0,0,0.15);cursor:pointer">${ride.driverName[0]}</div>`,
          className: "",
          iconAnchor: [18, 18],
        });

        const marker = L.marker([ride.fromLat, ride.fromLng], { icon: rideIcon });

        marker.bindPopup(`
          <div style="font-family:sans-serif;min-width:160px">
            <p style="font-weight:600;font-size:13px;margin:0 0 4px">${ride.driverName}</p>
            <p style="font-size:12px;color:#6b7280;margin:0 0 2px">${ride.from} → ${ride.to}</p>
            <p style="font-size:12px;color:#6b7280;margin:0 0 6px">${ride.departureTime} · ${ride.availableSeats} seats</p>
            <p style="font-size:14px;font-weight:700;color:#7c3aed;margin:0">₹${ride.fuelShare}</p>
          </div>
        `);

        marker.addTo(map);
        marker.on("click", () => setSelected(ride.id));
      });

      // draw lines from each origin to destination
      rides.forEach((ride) => {
        L.polyline(
          [[ride.fromLat, ride.fromLng], [12.9231, 77.4987]],
          { color: "#7c3aed", weight: 1.5, opacity: 0.3, dashArray: "4 6" }
        ).addTo(map);
      });

      setMapReady(true);
    });
  }, [rides, mapReady]);

  const selectedRide = rides.find(r => r.id === selected);

  return (
    <div className="relative" style={{ height: "calc(100vh - 64px)" }}>
      {/* header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <h1 className="text-base font-semibold text-gray-900">Rides near you</h1>
        <p className="text-xs text-gray-500">{rides.length} active rides · tap a pin to view</p>
      </div>

      {/* leaflet css */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      {/* map container */}
      <div ref={mapRef} style={{ height: "100%", width: "100%", paddingTop: "56px" }} />

      {/* cluster badge */}
      <div className="absolute top-16 left-4 z-10 bg-white rounded-xl shadow-sm border border-gray-100 px-3 py-2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-gray-700">AI clustered {rides.length} routes</span>
      </div>

      {/* selected ride bottom sheet */}
      {selectedRide && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-2xl shadow-lg p-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
                {selectedRide.driverName[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{selectedRide.driverName}</p>
                <p className="text-xs text-gray-500">{selectedRide.from} → {selectedRide.to}</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-400 text-lg leading-none"
            >✕</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-xs text-gray-500">
              <span>🕐 {selectedRide.departureTime}</span>
              <span>💺 {selectedRide.availableSeats} seats</span>
              <span>🚗 {selectedRide.vehicleType}</span>
            </div>
            <button
              onClick={() => router.push("/find")}
              className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-xl"
            >
              ₹{selectedRide.fuelShare} · Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
}