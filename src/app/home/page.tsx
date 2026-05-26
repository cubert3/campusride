"use client";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Car, Leaf, Users, Zap, Search } from "lucide-react";

export default function HomePage() {
  const { user, rides, bookings } = useApp();
  const router = useRouter();
  const [co2, setCo2] = useState(0);

  useEffect(() => {
    const target = parseFloat((rides.length * 2.1).toFixed(1));
    let current = 0;
    const timer = setInterval(() => {
      current = parseFloat((current + 0.1).toFixed(1));
      setCo2(current);
      if (current >= target) { setCo2(target); clearInterval(timer); }
    }, 30);
    return () => clearInterval(timer);
  }, [rides]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6 pt-2">
        <div>
          <p className="text-sm text-gray-500">Good morning</p>
          <h1 className="text-xl font-semibold text-gray-900">{user.name} 👋</h1>
          <p className="text-xs text-gray-400">{user.college}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
          {user.name[0]}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <Leaf size={18} className="text-green-600 mx-auto mb-1" />
          <p className="text-lg font-semibold text-green-700">{co2}</p>
          <p className="text-xs text-green-600">kg CO₂ saved</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <Car size={18} className="text-purple-600 mx-auto mb-1" />
          <p className="text-lg font-semibold text-purple-700">{rides.length}</p>
          <p className="text-xs text-purple-600">active rides</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <Users size={18} className="text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-semibold text-blue-700">{bookings.length}</p>
          <p className="text-xs text-blue-600">my bookings</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => router.push("/find")}
          className="bg-purple-600 text-white rounded-xl p-4 flex flex-col items-start gap-2 active:scale-95 transition-transform"
        >
          <Search size={22} />
          <span className="font-medium text-sm">Find a ride</span>
          <span className="text-xs text-purple-200">{rides.filter(r => r.availableSeats > 0).length} available</span>
        </button>
        <button
          onClick={() => router.push("/offer")}
          className="bg-gray-900 text-white rounded-xl p-4 flex flex-col items-start gap-2 active:scale-95 transition-transform"
        >
          <Zap size={22} />
          <span className="font-medium text-sm">Offer a ride</span>
          <span className="text-xs text-gray-400">Share your route</span>
        </button>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">Rides near you</h2>
      <div className="space-y-3">
        {rides.slice(0, 3).map(ride => (
          <div key={ride.id} className="border border-gray-100 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{ride.from} → {ride.to}</p>
              <p className="text-xs text-gray-500">{ride.driverName} · {ride.departureTime}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-purple-600">₹{ride.fuelShare}</p>
              <p className="text-xs text-gray-400">{ride.availableSeats} seats</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}