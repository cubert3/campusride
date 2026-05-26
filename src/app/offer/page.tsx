"use client";

import { useApp } from "@/context/AppContext";
import { Ride } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bike, Car, CheckCircle, Clock, MapPin, Plus, ShieldCheck, Users } from "lucide-react";

const pickupOptions = [
  { name: "Koramangala", lat: 12.9352, lng: 77.6245, share: 40 },
  { name: "HSR Layout", lat: 12.9116, lng: 77.6389, share: 35 },
  { name: "Jayanagar", lat: 12.9308, lng: 77.5838, share: 45 },
  { name: "BTM Layout", lat: 12.9166, lng: 77.6101, share: 30 },
];

export default function OfferPage() {
  const { user, addRide } = useApp();
  const router = useRouter();
  const [from, setFrom] = useState(pickupOptions[0]);
  const [time, setTime] = useState("08:20 AM");
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");
  const [seats, setSeats] = useState(2);
  const [created, setCreated] = useState(false);

  const suggestedShare = vehicleType === "bike" ? Math.max(25, from.share - 10) : from.share;

  function createRide() {
    const ride: Ride = {
      id: `ride_${Date.now()}`,
      driverId: user.uid,
      driverName: user.name,
      driverRating: user.rating,
      from: from.name,
      fromLat: from.lat,
      fromLng: from.lng,
      to: "RV College",
      toLat: 12.9231,
      toLng: 77.4987,
      departureTime: time,
      totalSeats: seats,
      availableSeats: seats,
      fuelShare: suggestedShare,
      vehicleType,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    addRide(ride);
    setCreated(true);
  }

  if (created) {
    return (
      <div className="map-grid flex min-h-screen items-end p-4">
        <div className="glass-panel w-full rounded-[34px] p-5 text-center">
          <CheckCircle size={60} className="mx-auto mb-4 text-emerald-300" />
          <h1 className="text-3xl font-semibold tracking-tight">Ride is live</h1>
          <p className="mt-2 text-sm text-white/50">Students can now join your commute and pay directly by UPI.</p>
          <div className="my-6 rounded-[28px] bg-white/[0.06] p-4 text-left">
            <p className="font-semibold text-white">{from.name} to RV College</p>
            <p className="mt-1 text-sm text-white/45">
              {time} / {seats} seats / Rs {suggestedShare}
            </p>
          </div>
          <button onClick={() => router.push("/home")} className="w-full rounded-full bg-white py-4 font-bold text-black">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <header className="pt-2">
        <p className="text-sm text-white/45">Driver mode</p>
        <h1 className="text-3xl font-semibold tracking-tight">Offer your commute</h1>
      </header>

      <section className="relative mt-5 overflow-hidden rounded-[34px] bg-[#111] p-5">
        <p className="absolute -left-1 top-8 text-7xl font-black tracking-tight text-white/[0.04]">Drive</p>
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">No platform fee</div>
            <ShieldCheck size={18} className="text-white/60" />
          </div>
          <div className="h-28 w-full car-sedan" />
          <p className="mt-3 max-w-xs text-lg font-semibold text-white">Publish a verified student-only ride in under a minute.</p>
        </div>
      </section>

      <section className="mt-4 space-y-4">
        <Block label="Pickup area" icon={<MapPin size={15} />}>
          <div className="grid grid-cols-2 gap-2">
            {pickupOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => setFrom(option)}
                className={`rounded-[22px] border px-3 py-3 text-left text-sm font-bold ${
                  from.name === option.name ? "border-white bg-white text-black" : "border-white/10 bg-white/[0.05] text-white"
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </Block>

        <div className="grid grid-cols-2 gap-3">
          <Block label="Vehicle" icon={<Car size={15} />}>
            <div className="grid grid-cols-2 gap-2">
              {(["car", "bike"] as const).map((type) => {
                const Icon = type === "car" ? Car : Bike;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setVehicleType(type);
                      setSeats(type === "bike" ? 1 : 2);
                    }}
                    className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold capitalize ${
                      vehicleType === type ? "bg-white text-black" : "bg-white/[0.07] text-white/55"
                    }`}
                  >
                    <Icon size={16} />
                    {type}
                  </button>
                );
              })}
            </div>
          </Block>

          <Block label="Seats" icon={<Users size={15} />}>
            <div className="flex items-center justify-between rounded-full bg-white/[0.07] px-2 py-2">
              <button onClick={() => setSeats(Math.max(1, seats - 1))} className="h-9 w-9 rounded-full bg-black font-black text-white">
                -
              </button>
              <span className="font-black text-white">{seats}</span>
              <button
                onClick={() => setSeats(Math.min(vehicleType === "bike" ? 1 : 4, seats + 1))}
                className="h-9 w-9 rounded-full bg-black font-black text-white"
              >
                +
              </button>
            </div>
          </Block>
        </div>

        <Block label="Departure time" icon={<Clock size={15} />}>
          <input
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/[0.07] px-4 py-4 text-sm font-bold text-white outline-none"
          />
        </Block>
      </section>

      <section className="glass-panel mt-4 rounded-[30px] p-4">
        <p className="text-sm text-white/45">Suggested fuel share</p>
        <div className="mt-1 flex items-end justify-between">
          <div>
            <p className="text-5xl font-semibold tracking-tight">Rs {suggestedShare}</p>
            <p className="mt-1 text-xs text-white/40">Fair split based on distance</p>
          </div>
          <button onClick={createRide} className="flex items-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-bold text-black">
            <Plus size={17} />
            Publish
          </button>
        </div>
      </section>
    </div>
  );
}

function Block({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-[28px] p-4">
      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/40">
        {icon}
        {label}
      </p>
      {children}
    </div>
  );
}
