import { Ride, User, Booking, College } from "@/types";

export const colleges: College[] = [
  {
    id: "nhce",
    shortName: "NHCE",
    name: "New Horizon College of Engineering",
    lat: 12.9344,
    lng: 77.6914,
  },
  {
    id: "rvce",
    shortName: "RVCE",
    name: "RV College of Engineering",
    lat: 12.9231,
    lng: 77.4987,
  },
  {
    id: "bmsce",
    shortName: "BMSCE",
    name: "BMS College of Engineering",
    lat: 12.9416,
    lng: 77.5655,
  },
  {
    id: "pesu",
    shortName: "PESU",
    name: "PES University",
    lat: 12.9352,
    lng: 77.5352,
  },
];

export const defaultCollege = colleges[0];

export const mockUser: User = {
  uid: "user_001",
  email: "pranav@nhce.edu",
  name: "Pranav",
  college: defaultCollege.name,
  department: "Computer Science",
  year: 3,
  verified: true,
  reliabilityScore: 92,
  rating: 4.8,
};

export const mockRides: Ride[] = [
  {
    id: "ride_001",
    driverId: "user_002",
    driverName: "Arjun Sharma",
    driverRating: 4.9,
    from: "Koramangala",
    fromLat: 12.9352,
    fromLng: 77.6245,
    to: defaultCollege.shortName,
    toLat: defaultCollege.lat,
    toLng: defaultCollege.lng,
    departureTime: "08:15 AM",
    totalSeats: 3,
    availableSeats: 2,
    fuelShare: 40,
    vehicleType: "car",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ride_002",
    driverId: "user_003",
    driverName: "Sneha Rao",
    driverRating: 4.7,
    from: "HSR Layout",
    fromLat: 12.9116,
    fromLng: 77.6389,
    to: defaultCollege.shortName,
    toLat: defaultCollege.lat,
    toLng: defaultCollege.lng,
    departureTime: "08:30 AM",
    totalSeats: 1,
    availableSeats: 1,
    fuelShare: 35,
    vehicleType: "bike",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ride_003",
    driverId: "user_004",
    driverName: "Rahul Verma",
    driverRating: 4.6,
    from: "BTM Layout",
    fromLat: 12.9166,
    fromLng: 77.6101,
    to: defaultCollege.shortName,
    toLat: defaultCollege.lat,
    toLng: defaultCollege.lng,
    departureTime: "08:00 AM",
    totalSeats: 4,
    availableSeats: 3,
    fuelShare: 30,
    vehicleType: "car",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ride_004",
    driverId: "user_005",
    driverName: "Priya Nair",
    driverRating: 5.0,
    from: "Jayanagar",
    fromLat: 12.9308,
    fromLng: 77.5838,
    to: defaultCollege.shortName,
    toLat: defaultCollege.lat,
    toLng: defaultCollege.lng,
    departureTime: "08:45 AM",
    totalSeats: 2,
    availableSeats: 1,
    fuelShare: 45,
    vehicleType: "car",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ride_005",
    driverId: "user_006",
    driverName: "Karan Mehta",
    driverRating: 4.5,
    from: "Electronic City",
    fromLat: 12.8399,
    fromLng: 77.6770,
    to: defaultCollege.shortName,
    toLat: defaultCollege.lat,
    toLng: defaultCollege.lng,
    departureTime: "07:45 AM",
    totalSeats: 3,
    availableSeats: 2,
    fuelShare: 60,
    vehicleType: "car",
    status: "active",
    createdAt: new Date().toISOString(),
  },
];

export const mockBookings: Booking[] = [];

export function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function co2Saved(rides: Ride[]): number {
  return Math.round(rides.length * 2.1);
}
