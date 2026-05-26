"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Bike, Car, Clock, Navigation, Users, X } from "lucide-react";
import { useState } from "react";

export default function MapPage() {
  const { rides } = useApp();
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(rides[0]?.id ?? null);
  const selectedRide = rides.find((ride) => ride.id === selected);

  return (
    <div className="map-grid relative min-h-[calc(100vh-64px)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0_44px,rgb(0_0_0_/_0.22)_45px),linear-gradient(180deg,rgb(0_0_0_/_0.05),#050505_94%)]" />

      <header className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/45">Live map</p>
          <h1 className="text-2xl font-semibold tracking-tight">Campus routes</h1>
        </div>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black/80 text-white">
          <Navigation size={18} />
        </button>
      </header>

      <div className="absolute left-1/2 top-[34%] z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-white bg-black shadow-[0_0_0_12px_rgb(255_255_255_/_0.08)]" />
      <div className="absolute left-[22%] top-[56%] h-7 w-16 -rotate-6 rounded-full car-sedan" />
      <div className="absolute right-[22%] top-[43%] h-7 w-16 rotate-90 rounded-full car-suv" />

      {rides.map((ride, index) => (
        <button
          key={ride.id}
          onClick={() => setSelected(ride.id)}
          className="absolute z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-black text-black shadow-2xl"
          style={{
            left: `${22 + (index % 3) * 24}%`,
            top: `${28 + index * 8}%`,
          }}
        >
          {ride.driverName[0]}
        </button>
      ))}

      <div className="absolute left-4 top-24 z-10 rounded-full bg-black/80 px-4 py-2 text-xs font-bold text-emerald-300">
        Route matched {rides.length} rides
      </div>

      {selectedRide && (
        <div className="glass-panel absolute bottom-0 left-0 right-0 z-20 rounded-t-[34px] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-black text-black">
                {selectedRide.driverName[0]}
              </div>
              <div>
                <p className="font-semibold text-white">{selectedRide.driverName}</p>
                <p className="text-xs text-white/45">
                  {selectedRide.from} to {selectedRide.to}
                </p>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Pill icon={<Clock size={13} />} text={selectedRide.departureTime} />
            <Pill icon={<Users size={13} />} text={`${selectedRide.availableSeats} seats`} />
            <Pill icon={selectedRide.vehicleType === "car" ? <Car size={13} /> : <Bike size={13} />} text={selectedRide.vehicleType} />
          </div>

          <button onClick={() => router.push("/find")} className="mt-4 w-full rounded-full bg-white py-4 font-bold text-black">
            Join for Rs {selectedRide.fuelShare}
          </button>
        </div>
      )}
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-full bg-white/[0.07] px-2 py-3 text-xs font-semibold capitalize text-white/65">
      {icon}
      {text}
    </div>
  );
}
