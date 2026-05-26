export interface User {
  uid: string;
  email: string;
  name: string;
  college: string;
  department: string;
  year: number;
  verified: boolean;
  reliabilityScore: number;
  rating: number;
}

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  driverRating: number;
  from: string;
  fromLat: number;
  fromLng: number;
  to: string;
  toLat: number;
  toLng: number;
  departureTime: string;
  totalSeats: number;
  availableSeats: number;
  fuelShare: number;
  vehicleType: "bike" | "car";
  status: "active" | "full" | "completed";
  createdAt: string;
}

export interface Booking {
  id: string;
  rideId: string;
  riderId: string;
  riderName: string;
  otp: string;
  status: "pending" | "confirmed" | "completed";
  createdAt: string;
}