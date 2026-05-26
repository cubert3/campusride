"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { colleges, defaultCollege, mockRides, mockUser, mockBookings, generateOTP } from "@/lib/mockData";
import { Ride, Booking, College } from "@/types";

interface AppContextType {
  user: typeof mockUser;
  rides: Ride[];
  bookings: Booking[];
  colleges: College[];
  selectedCollege: College;
  setSelectedCollegeId: (collegeId: string) => void;
  joinRide: (rideId: string) => string;
  addRide: (ride: Ride) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rides, setRides] = useState<Ride[]>(mockRides);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedCollege, setSelectedCollege] = useState<College>(() => {
    if (typeof window === "undefined") return defaultCollege;
    const savedCollegeId = window.localStorage.getItem("campusride_college");
    return colleges.find((college) => college.id === savedCollegeId) || defaultCollege;
  });

  const collegeRides = rides.map((ride) => ({
    ...ride,
    to: selectedCollege.shortName,
    toLat: selectedCollege.lat,
    toLng: selectedCollege.lng,
  }));

  const user = { ...mockUser, college: selectedCollege.name };

  function setSelectedCollegeId(collegeId: string) {
    const nextCollege = colleges.find((college) => college.id === collegeId);
    if (nextCollege) {
      window.localStorage.setItem("campusride_college", nextCollege.id);
      setSelectedCollege(nextCollege);
    }
  }

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
    setRides(prev => [{ ...ride, to: selectedCollege.shortName, toLat: selectedCollege.lat, toLng: selectedCollege.lng }, ...prev]);
  }

  return (
    <AppContext.Provider
      value={{
        user,
        rides: collegeRides,
        bookings,
        colleges,
        selectedCollege,
        setSelectedCollegeId,
        joinRide,
        addRide,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
