"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { mockRides, mockUser, mockBookings, generateOTP } from "@/lib/mockData";
import { Ride, Booking } from "@/types";

interface AppContextType {
  user: typeof mockUser;
  rides: Ride[];
  bookings: Booking[];
  joinRide: (rideId: string) => string;
  addRide: (ride: Ride) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rides, setRides] = useState<Ride[]>(mockRides);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  function joinRide(rideId: string): string {
    const otp = generateOTP();
    setRides(prev => prev.map(r =>
      r.id === rideId ? { ...r, availableSeats: r.availableSeats - 1 } : r
    ));
    const booking: Booking = {
      id: `booking_${Date.now()}`,
      rideId,
      riderId: mockUser.uid,
      riderName: mockUser.name,
      otp,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, booking]);
    return otp;
  }

  function addRide(ride: Ride) {
    setRides(prev => [ride, ...prev]);
  }

  return (
    <AppContext.Provider value={{ user: mockUser, rides, bookings, joinRide, addRide }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}