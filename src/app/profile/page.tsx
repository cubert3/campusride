"use client";
import { useApp } from "@/context/AppContext";
import { Star, Shield, TrendingUp } from "lucide-react";

export default function ProfilePage() {
  const { user, bookings, rides } = useApp();
  const myRides = rides.filter(r => r.driverId === user.uid);

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6 pt-2">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-2xl font-semibold">
          {user.name[0]}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.department} · Year {user.year}</p>
          <p className="text-xs text-gray-400">{user.college}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-yellow-50 rounded-xl p-3 text-center">
          <Star size={16} className="text-yellow-500 mx-auto mb-1" />
          <p className="text-lg font-semibold text-yellow-700">{user.rating}</p>
          <p className="text-xs text-yellow-600">rating</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <TrendingUp size={16} className="text-green-600 mx-auto mb-1" />
          <p className="text-lg font-semibold text-green-700">{user.reliabilityScore}%</p>
          <p className="text-xs text-green-600">reliability</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <Shield size={16} className="text-purple-600 mx-auto mb-1" />
          <p className="text-lg font-semibold text-purple-700">✓</p>
          <p className="text-xs text-purple-600">verified</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-500 mb-1">College email</p>
          <p className="text-sm text-gray-900">{user.email}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 flex justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Rides taken</p>
            <p className="text-sm font-semibold text-gray-900">{bookings.length}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Rides offered</p>
            <p className="text-sm font-semibold text-gray-900">{myRides.length}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">CO₂ saved</p>
            <p className="text-sm font-semibold text-gray-900">{(bookings.length * 2.1).toFixed(1)} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}