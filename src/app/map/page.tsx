"use client";

import { useApp } from "@/context/AppContext";
import { Bike, Car, Clock, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MapPage() {
  const { rides, selectedCollege } = useApp();
  const router = useRouter();
  const [selected, setSelected] = useState(rides[0]?.id ?? "");
  const selectedRide = rides.find((ride) => ride.id === selected) || rides[0];

  return (
    <div className="space-y-4 p-4">
      <header>
        <p className="text-sm text-slate-500">Route map</p>
        <h1 className="text-2xl font-bold text-slate-950">Rides to {selectedCollege.shortName}</h1>
      </header>

      <section className="relative h-72 overflow-hidden rounded-3xl bg-indigo-50 shadow-sm">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#c7d2fe_1px,transparent_1px),linear-gradient(90deg,#c7d2fe_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200" />
        <div className="absolute right-5 top-5 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-indigo-700 shadow-sm">
          {rides.length} live routes
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-bold text-white shadow-lg">
          {selectedCollege.shortName}
        </div>
        {rides.map((ride, index) => (
          <button
            key={ride.id}
            onClick={() => setSelected(ride.id)}
            className={`absolute flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md ${
              selectedRide?.id === ride.id ? "bg-slate-950 text-white" : "bg-white text-indigo-700"
            }`}
            style={{
              left: `${16 + (index % 3) * 28}%`,
              top: `${22 + index * 10}%`,
            }}
          >
            {ride.driverName[0]}
          </button>
        ))}
      </section>

      {selectedRide && (
        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="font-bold text-slate-950">{selectedRide.driverName}</p>
              <p className="text-sm text-slate-500">{selectedRide.from} to {selectedRide.to}</p>
            </div>
            <p className="font-bold text-indigo-700">Rs {selectedRide.fuelShare}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
            <Pill icon={<Clock size={13} />} text={selectedRide.departureTime} />
            <Pill icon={<Users size={13} />} text={`${selectedRide.availableSeats} seats`} />
            <Pill icon={selectedRide.vehicleType === "car" ? <Car size={13} /> : <Bike size={13} />} text={selectedRide.vehicleType} />
          </div>
          <button onClick={() => router.push("/find")} className="mt-4 w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white">
            View ride
          </button>
        </section>
      )}

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold text-slate-950">All routes</h2>
        <div className="space-y-3">
          {rides.map((ride) => (
            <button key={ride.id} onClick={() => setSelected(ride.id)} className="flex w-full items-center gap-3 text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <MapPin size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900">{ride.from}</span>
                <span className="block text-xs text-slate-500">{ride.departureTime} / {ride.availableSeats} seats</span>
              </span>
              <span className="text-sm font-bold text-indigo-700">Rs {ride.fuelShare}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center justify-center gap-1 rounded-full bg-slate-100 px-2 py-2 capitalize">
      {icon}
      {text}
    </span>
  );
}
