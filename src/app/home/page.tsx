"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Bike, Briefcase, Car, ChevronRight, Home, Leaf, MapPin, Navigation, ShieldCheck, UserRound } from "lucide-react";

export default function HomePage() {
  const { user, rides, bookings } = useApp();
  const router = useRouter();
  const openRides = rides.filter((ride) => ride.availableSeats > 0);
  const bestRide = openRides[0];
  const co2 = (rides.length * 2.1).toFixed(1);

  return (
    <div className="relative min-h-screen">
      <section className="map-grid relative h-[46vh] min-h-[340px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0_42px,rgb(0_0_0_/_0.2)_43px),linear-gradient(180deg,rgb(0_0_0_/_0.1),#090909_96%)]" />

        <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70">
            <UserRound size={18} />
          </div>
          <div className="rounded-full bg-black/80 px-4 py-2 text-sm font-bold text-white shadow-2xl">
            CampusRide
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70">
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="absolute left-1/2 top-[33%] z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[7px] border-white bg-black shadow-[0_0_0_10px_rgb(255_255_255_/_0.08)]" />
        <div className="absolute left-[22%] top-[63%] h-7 w-16 -rotate-6 rounded-full car-sedan" />
        <div className="absolute right-[20%] top-[50%] h-7 w-16 rotate-90 rounded-full car-suv" />
        <div className="absolute left-[48%] top-[58%] h-1 w-24 rotate-[28deg] rounded-full bg-white/15" />

        <button
          onClick={() => router.push("/map")}
          className="absolute right-5 top-24 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/80 text-white shadow-2xl"
        >
          <Navigation size={18} />
        </button>

        <div className="absolute bottom-12 left-5 right-5 z-10">
          <div className="mb-3 flex gap-2">
            <Chip icon={<Home size={14} />} label="Home" />
            <Chip icon={<Briefcase size={14} />} label="College" />
          </div>
          <button
            onClick={() => router.push("/find")}
            className="glass-panel flex w-full items-center gap-3 rounded-[26px] p-4 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
              <MapPin size={19} fill="currentColor" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-white/45">Where to?</p>
              <p className="truncate text-sm font-semibold text-white">RV College of Engineering</p>
            </div>
            <ChevronRight size={18} className="text-white/50" />
          </button>
        </div>
      </section>

      <section className="-mt-7 space-y-4 px-4 pb-4">
        <div className="glass-panel relative z-20 rounded-[30px] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">Good morning, {user.name}</p>
              <h1 className="text-2xl font-semibold tracking-tight text-white">Choose your commute</h1>
            </div>
            <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
              {openRides.length} live
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <RideClass
              title="Bike pool"
              time="2 min"
              price={`Rs ${Math.max(25, (bestRide?.fuelShare || 35) - 10)}`}
              active
              icon={<Bike size={17} />}
              visual="sedan"
              onClick={() => router.push("/find")}
            />
            <RideClass
              title="Car pool"
              time="5 min"
              price={`Rs ${bestRide?.fuelShare || 40}`}
              icon={<Car size={17} />}
              visual="suv"
              onClick={() => router.push("/find")}
            />
          </div>

          <button
            onClick={() => router.push("/find")}
            className="mt-4 w-full rounded-full bg-white py-4 text-base font-bold text-black active:scale-[0.99]"
          >
            Continue
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Metric icon={<ShieldCheck size={16} />} value="Verified" label="students" />
          <Metric icon={<Leaf size={16} />} value={co2} label="kg CO2" />
          <Metric icon={<Car size={16} />} value={`${bookings.length}`} label="bookings" />
        </div>
      </section>
    </div>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-xs font-semibold text-white">
      {icon}
      {label}
    </span>
  );
}

function RideClass({
  title,
  time,
  price,
  active,
  icon,
  visual,
  onClick,
}: {
  title: string;
  time: string;
  price: string;
  active?: boolean;
  icon: React.ReactNode;
  visual: "sedan" | "suv";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-[24px] p-4 text-left transition active:scale-[0.98] ${
        active ? "bg-emerald-500/20 ring-1 ring-emerald-300/30" : "bg-white/[0.07] ring-1 ring-white/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          {icon}
          {title}
        </span>
        <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-[11px] font-bold text-emerald-300">{price}</span>
      </div>
      <p className="mt-1 text-xs text-white/45">{time}</p>
      <div className="mt-4 flex justify-center">
        <div className={`h-14 w-32 ${visual === "sedan" ? "car-sedan" : "car-suv"}`} />
      </div>
    </button>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="soft-panel rounded-[22px] p-3 text-center">
      <div className="mx-auto mb-2 flex justify-center text-white/70">{icon}</div>
      <p className="text-sm font-bold text-white">{value}</p>
      <p className="text-[11px] text-white/40">{label}</p>
    </div>
  );
}
