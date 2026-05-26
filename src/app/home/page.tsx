"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Bike, Car, Leaf, MapPin, Search, ShieldCheck, Users } from "lucide-react";

export default function HomePage() {
  const { user, rides, bookings, colleges, selectedCollege, setSelectedCollegeId } = useApp();
  const router = useRouter();
  const openRides = rides.filter((ride) => ride.availableSeats > 0);
  const co2Saved = (bookings.length * 2.1 + rides.length * 0.4).toFixed(1);

  return (
    <div className="space-y-5 p-4">
      <header className="rounded-3xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Good morning</p>
            <h1 className="text-2xl font-bold text-slate-950">{user.name}</h1>
            <p className="text-xs text-slate-500">{user.department} / Year {user.year}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-700">
            {user.name[0]}
          </div>
        </div>

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          College
        </label>
        <select
          value={selectedCollege.id}
          onChange={(event) => setSelectedCollegeId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-500"
        >
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.shortName} - {college.name}
            </option>
          ))}
        </select>
      </header>

      <section className="rounded-3xl bg-indigo-600 p-5 text-white shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-indigo-100">
          <ShieldCheck size={18} />
          Verified student-only rides
        </div>
        <h2 className="text-3xl font-bold leading-tight">Share daily commutes to {selectedCollege.shortName}</h2>
        <p className="mt-3 text-sm leading-6 text-indigo-100">
          Students with bikes or cars offer seats. Riders split fuel directly through UPI.
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => router.push("/find")}
          className="rounded-3xl bg-slate-950 p-4 text-left text-white shadow-sm active:scale-[0.98]"
        >
          <Search size={24} />
          <span className="mt-5 block text-base font-bold">Find a ride</span>
          <span className="text-xs text-slate-300">{openRides.length} available</span>
        </button>
        <button
          onClick={() => router.push("/offer")}
          className="rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm active:scale-[0.98]"
        >
          <Car size={24} className="text-indigo-600" />
          <span className="mt-5 block text-base font-bold text-slate-950">Offer a ride</span>
          <span className="text-xs text-slate-500">Add your commute</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Metric icon={<Car size={18} />} value={`${openRides.length}`} label="open rides" />
        <Metric icon={<Users size={18} />} value={`${bookings.length}`} label="booked" />
        <Metric icon={<Leaf size={18} />} value={co2Saved} label="kg CO2" />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Nearby rides</h2>
          <button onClick={() => router.push("/map")} className="text-sm font-semibold text-indigo-700">
            Map
          </button>
        </div>
        <div className="space-y-3">
          {openRides.slice(0, 3).map((ride) => {
            const Vehicle = ride.vehicleType === "car" ? Car : Bike;
            return (
              <button
                key={ride.id}
                onClick={() => router.push("/find")}
                className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold text-slate-950">
                    <Vehicle size={16} className="text-indigo-600" />
                    {ride.from} to {ride.to}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} />
                    {ride.driverName} / {ride.departureTime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-700">Rs {ride.fuelShare}</p>
                  <p className="text-xs text-slate-400">{ride.availableSeats} seats</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 text-center shadow-sm">
      <div className="mx-auto mb-1 flex justify-center text-indigo-600">{icon}</div>
      <p className="text-lg font-bold text-slate-950">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
