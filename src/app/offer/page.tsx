"use client";

import { useApp } from "@/context/AppContext";
import { Ride } from "@/types";
import { Bike, Car, CheckCircle, Clock, MapPin, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const pickupOptions = [
  { name: "Marathahalli", lat: 12.9569, lng: 77.7011, share: 25 },
  { name: "Koramangala", lat: 12.9352, lng: 77.6245, share: 45 },
  { name: "HSR Layout", lat: 12.9116, lng: 77.6389, share: 40 },
  { name: "Whitefield", lat: 12.9698, lng: 77.7500, share: 35 },
];

export default function OfferPage() {
  const { user, addRide, selectedCollege } = useApp();
  const router = useRouter();
  const [from, setFrom] = useState(pickupOptions[0]);
  const [time, setTime] = useState("08:30 AM");
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");
  const [seats, setSeats] = useState(2);
  const [created, setCreated] = useState(false);
  const suggestedShare = vehicleType === "bike" ? Math.max(20, from.share - 10) : from.share;

  function createRide() {
    const ride: Ride = {
      id: `ride_${Date.now()}`,
      driverId: user.uid,
      driverName: user.name,
      driverRating: user.rating,
      from: from.name,
      fromLat: from.lat,
      fromLng: from.lng,
      to: selectedCollege.shortName,
      toLat: selectedCollege.lat,
      toLng: selectedCollege.lng,
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
      <div className="flex min-h-screen items-center p-4">
        <div className="w-full rounded-3xl bg-white p-6 text-center shadow-sm">
          <CheckCircle size={56} className="mx-auto mb-4 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-950">Ride published</h1>
          <p className="mt-2 text-sm text-slate-500">Your commute is now visible to students going to {selectedCollege.shortName}.</p>
          <button onClick={() => router.push("/home")} className="mt-6 w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <header>
        <p className="text-sm text-slate-500">Offer ride to</p>
        <h1 className="text-2xl font-bold text-slate-950">{selectedCollege.shortName}</h1>
        <p className="text-sm text-slate-500">Share your daily commute with verified students.</p>
      </header>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <FormLabel icon={<MapPin size={15} />} label="Pickup area" />
        <div className="grid grid-cols-2 gap-2">
          {pickupOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => setFrom(option)}
              className={`rounded-2xl border px-3 py-3 text-left text-sm font-bold ${
                from.name === option.name ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <FormLabel icon={<Car size={15} />} label="Vehicle" />
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
                  className={`flex items-center justify-center gap-1 rounded-xl py-3 text-sm font-bold capitalize ${
                    vehicleType === type ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon size={15} />
                  {type}
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <FormLabel icon={<Users size={15} />} label="Seats" />
          <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-2 py-2">
            <button onClick={() => setSeats(Math.max(1, seats - 1))} className="h-9 w-9 rounded-xl bg-white font-bold">-</button>
            <span className="font-bold">{seats}</span>
            <button onClick={() => setSeats(Math.min(vehicleType === "bike" ? 1 : 4, seats + 1))} className="h-9 w-9 rounded-xl bg-white font-bold">+</button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <FormLabel icon={<Clock size={15} />} label="Departure time" />
        <input
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none focus:border-indigo-500"
        />
      </section>

      <section className="rounded-3xl bg-emerald-50 p-4">
        <p className="text-sm text-emerald-700">Suggested fuel share</p>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-4xl font-black text-slate-950">Rs {suggestedShare}</p>
          <button onClick={createRide} className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white">
            <Plus size={17} />
            Publish
          </button>
        </div>
      </section>
    </div>
  );
}

function FormLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
      {icon}
      {label}
    </p>
  );
}
