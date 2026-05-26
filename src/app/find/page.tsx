"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Bike, Car, CheckCircle, Clock, MapPin, ShieldCheck, Star, Users } from "lucide-react";

export default function FindPage() {
  const { rides, joinRide } = useApp();
  const router = useRouter();
  const [joined, setJoined] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [filter, setFilter] = useState<"all" | "car" | "bike">("all");

  const availableRides = useMemo(
    () => rides.filter((ride) => ride.availableSeats > 0 && (filter === "all" || ride.vehicleType === filter)),
    [rides, filter],
  );

  function handleJoin(rideId: string) {
    const generatedOtp = joinRide(rideId);
    setOtp(generatedOtp);
    setJoined(rideId);
  }

  const joinedRide = rides.find((ride) => ride.id === joined);

  if (joined && joinedRide) {
    return (
      <div className="map-grid flex min-h-screen items-end p-4">
        <div className="glass-panel w-full rounded-[34px] p-5 text-center">
          <CheckCircle size={60} className="mx-auto mb-4 text-emerald-300" />
          <h2 className="text-3xl font-semibold tracking-tight">Ride joined</h2>
          <p className="mt-2 text-sm text-white/50">Show this code to {joinedRide.driverName} before the ride starts.</p>
          <div className="my-6 rounded-[28px] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">Start OTP</p>
            <p className="mt-2 text-6xl font-black tracking-[0.2em] text-white">{otp}</p>
          </div>
          <button
            onClick={() => router.push(`/payment?amount=${joinedRide.fuelShare}&driver=${encodeURIComponent(joinedRide.driverName)}`)}
            className="mb-3 w-full rounded-full bg-white py-4 font-bold text-black"
          >
            Pay Rs {joinedRide.fuelShare} by UPI
          </button>
          <button onClick={() => setJoined(null)} className="w-full rounded-full bg-white/10 py-4 font-bold text-white">
            Back to rides
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <header className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-white/45">Ride options</p>
          <h1 className="text-3xl font-semibold tracking-tight">To RV College</h1>
        </div>
        <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
          {availableRides.length} live
        </div>
      </header>

      <section className="relative mt-5 overflow-hidden rounded-[32px] bg-[#101010] p-4">
        <p className="absolute left-4 top-6 text-6xl font-black tracking-tight text-white/[0.04]">Campus</p>
        <div className="relative z-10">
          <div className="mb-4 h-24 w-full car-suv" />
          <RouteLine from="Your area" to="RV College of Engineering" />
        </div>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-full bg-white/[0.06] p-1">
        {(["all", "car", "bike"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`rounded-full py-2 text-sm font-bold capitalize ${
              filter === option ? "bg-white text-black" : "text-white/45"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {availableRides.map((ride, index) => {
          const Vehicle = ride.vehicleType === "car" ? Car : Bike;
          return (
            <article key={ride.id} className="glass-panel overflow-hidden rounded-[30px] p-4">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-black text-black">
                    {ride.driverName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{ride.driverName}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-white/45">
                      <Star size={12} className="fill-amber-300 text-amber-300" />
                      {ride.driverRating}
                      <span className="mx-1">/</span>
                      <ShieldCheck size={12} className="text-emerald-300" />
                      verified
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-white">Rs {ride.fuelShare}</p>
                  <p className="text-xs text-white/40">fuel share</p>
                </div>
              </div>

              <div className="grid grid-cols-[18px_1fr] gap-x-3 gap-y-2 rounded-[24px] bg-white/[0.05] p-4">
                <span className="mt-1 h-3 w-3 rounded-full border-4 border-white bg-black" />
                <p className="text-sm font-semibold text-white">{ride.from}</p>
                <span className="route-line ml-[5px] h-7 w-0.5" />
                <p className="text-xs text-white/35">Matched route #{index + 1}</p>
                <span className="mt-1 h-3 w-3 rounded-full bg-red-500" />
                <p className="text-sm font-semibold text-white">{ride.to}</p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex gap-2 text-xs text-white/55">
                  <Pill icon={<Clock size={13} />} text={ride.departureTime} />
                  <Pill icon={<Users size={13} />} text={`${ride.availableSeats}`} />
                  <Pill icon={<Vehicle size={13} />} text={ride.vehicleType} />
                </div>
                <button onClick={() => handleJoin(ride.id)} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black">
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

function RouteLine({ from, to }: { from: string; to: string }) {
  return (
    <div className="space-y-2 rounded-[26px] border border-white/10 bg-black/55 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
          <MapPin size={15} />
        </span>
        <span className="text-sm font-semibold text-white">{from}</span>
      </div>
      <div className="ml-4 h-7 w-px bg-white/15" />
      <div className="flex items-center gap-3">
        <span className="h-8 w-8 rounded-full bg-red-500" />
        <span className="text-sm font-semibold text-white">{to}</span>
      </div>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-white/[0.07] px-3 py-2 capitalize">
      {icon}
      {text}
    </span>
  );
}
