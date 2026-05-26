"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Bike, Car, CheckCircle, Clock, ShieldCheck, Star, Users } from "lucide-react";

export default function FindPage() {
  const { rides, joinRide, selectedCollege } = useApp();
  const router = useRouter();
  const [joined, setJoined] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [filter, setFilter] = useState<"all" | "car" | "bike">("all");

  const availableRides = useMemo(
    () => rides.filter((ride) => ride.availableSeats > 0 && (filter === "all" || ride.vehicleType === filter)),
    [rides, filter],
  );

  function handleJoin(rideId: string) {
    setOtp(joinRide(rideId));
    setJoined(rideId);
  }

  const joinedRide = rides.find((ride) => ride.id === joined);

  if (joined && joinedRide) {
    return (
      <div className="flex min-h-screen items-center p-4">
        <div className="w-full rounded-3xl bg-white p-6 text-center shadow-sm">
          <CheckCircle size={56} className="mx-auto mb-4 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-950">Ride joined</h1>
          <p className="mt-2 text-sm text-slate-500">Show this OTP to {joinedRide.driverName} to start the ride.</p>
          <div className="my-6 rounded-3xl bg-indigo-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Start OTP</p>
            <p className="mt-2 text-5xl font-black tracking-[0.18em] text-indigo-700">{otp}</p>
          </div>
          <button
            onClick={() => router.push(`/payment?amount=${joinedRide.fuelShare}&driver=${encodeURIComponent(joinedRide.driverName)}`)}
            className="mb-3 w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white"
          >
            Pay Rs {joinedRide.fuelShare} via UPI
          </button>
          <button onClick={() => setJoined(null)} className="w-full rounded-2xl bg-slate-100 py-3 font-bold text-slate-700">
            Back to rides
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <header>
        <p className="text-sm text-slate-500">Find rides to</p>
        <h1 className="text-2xl font-bold text-slate-950">{selectedCollege.shortName}</h1>
        <p className="text-sm text-slate-500">{availableRides.length} verified rides available</p>
      </header>

      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-200 p-1">
        {(["all", "car", "bike"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`rounded-xl py-2 text-sm font-bold capitalize ${filter === option ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {availableRides.map((ride) => {
          const Vehicle = ride.vehicleType === "car" ? Car : Bike;
          return (
            <article key={ride.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 font-bold text-indigo-700">
                    {ride.driverName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{ride.driverName}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {ride.driverRating}
                      <span>/</span>
                      <ShieldCheck size={12} className="text-emerald-600" />
                      verified
                    </p>
                  </div>
                </div>
                <p className="font-bold text-indigo-700">Rs {ride.fuelShare}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-900">{ride.from}</p>
                <p className="my-1 text-xs text-slate-400">to</p>
                <p className="font-semibold text-slate-900">{ride.to}</p>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex gap-2 text-xs text-slate-500">
                  <Pill icon={<Clock size={13} />} text={ride.departureTime} />
                  <Pill icon={<Users size={13} />} text={`${ride.availableSeats} seats`} />
                  <Pill icon={<Vehicle size={13} />} text={ride.vehicleType} />
                </div>
                <button onClick={() => handleJoin(ride.id)} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white">
                  Join
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 capitalize">
      {icon}
      {text}
    </span>
  );
}
