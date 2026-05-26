"use client";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Star, Users, Clock, Car, Bike } from "lucide-react";

export default function FindPage() {
  const { rides, joinRide } = useApp();
  const router = useRouter();
  const [joined, setJoined] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  function handleJoin(rideId: string) {
    const generatedOtp = joinRide(rideId);
    setOtp(generatedOtp);
    setJoined(rideId);
  }

  if (joined) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-green-50 rounded-2xl p-8 text-center w-full max-w-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ride joined!</h2>
          <p className="text-sm text-gray-500 mb-6">Show this OTP to your driver to start the ride</p>
          <div className="bg-white rounded-xl p-4 mb-6 border border-green-200">
            <p className="text-xs text-gray-500 mb-1">Your OTP</p>
            <p className="text-4xl font-bold text-purple-600 tracking-widest">{otp}</p>
          </div>
          <button
            onClick={() => router.push(`/payment?amount=${rides.find(r => r.id === joined)?.fuelShare}&driver=${rides.find(r => r.id === joined)?.driverName}`)}
            className="w-full bg-green-600 text-white rounded-xl py-3 font-medium mb-3"
          >
            Pay ₹{rides.find(r => r.id === joined)?.fuelShare} via UPI
          </button>
          <button
            onClick={() => setJoined(null)}
            className="w-full bg-purple-600 text-white rounded-xl py-3 font-medium"
          >
            Back to rides
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-gray-900 mb-1 pt-2">Find a ride</h1>
      <p className="text-sm text-gray-500 mb-4">{rides.filter(r => r.availableSeats > 0).length} rides available today</p>

      <div className="space-y-3">
        {rides.filter(r => r.availableSeats > 0).map(ride => (
          <div key={ride.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-sm">
                  {ride.driverName[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{ride.driverName}</p>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-500">{ride.driverRating}</span>
                    <span className="text-xs text-gray-300 mx-1">·</span>
                    {ride.vehicleType === "car"
                      ? <Car size={11} className="text-gray-400" />
                      : <Bike size={11} className="text-gray-400" />}
                    <span className="text-xs text-gray-500 capitalize">{ride.vehicleType}</span>
                  </div>
                </div>
              </div>
              <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-2 py-1 rounded-lg">
                ₹{ride.fuelShare}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="w-0.5 h-4 bg-gray-200" />
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-700">{ride.from}</p>
                <p className="text-sm text-gray-700">{ride.to}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock size={12} />{ride.departureTime}</span>
                <span className="flex items-center gap-1"><Users size={12} />{ride.availableSeats} seats left</span>
              </div>
              <button
                onClick={() => handleJoin(ride.id)}
                className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-xl active:scale-95 transition-transform"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}