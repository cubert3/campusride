"use client";

import { useApp } from "@/context/AppContext";
import { Award, Mail, ShieldCheck, Star, TrendingUp } from "lucide-react";

export default function ProfilePage() {
  const { user, bookings, rides } = useApp();
  const myRides = rides.filter((ride) => ride.driverId === user.uid);

  return (
    <div className="min-h-screen p-4">
      <section className="relative mt-2 overflow-hidden rounded-[34px] bg-[#111] p-5">
        <p className="absolute -left-2 top-14 text-7xl font-black tracking-tight text-white/[0.04]">Safe</p>
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-black text-black">{user.name[0]}</div>
            <div>
              <p className="text-sm text-white/45">{user.college}</p>
              <h1 className="text-3xl font-semibold tracking-tight">{user.name}</h1>
              <p className="text-sm text-white/45">
                {user.department} / Year {user.year}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-3 text-sm font-bold text-emerald-300">
            <ShieldCheck size={17} />
            College ID and email verified
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Metric icon={<Star size={17} />} value={`${user.rating}`} label="rating" />
        <Metric icon={<TrendingUp size={17} />} value={`${user.reliabilityScore}%`} label="reliable" />
        <Metric icon={<Award size={17} />} value="OTP" label="protected" />
      </div>

      <section className="mt-4 space-y-3">
        <Info icon={<Mail size={17} />} label="College email" value={user.email} />
        <div className="glass-panel grid grid-cols-3 gap-3 rounded-[30px] p-4">
          <Mini label="Taken" value={`${bookings.length}`} />
          <Mini label="Offered" value={`${myRides.length}`} />
          <Mini label="CO2" value={`${(bookings.length * 2.1).toFixed(1)} kg`} />
        </div>
      </section>

      <section className="glass-panel mt-4 rounded-[30px] p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/40">Trust signals</p>
        <div className="space-y-3 text-sm font-semibold text-white">
          <p>Verified college domain</p>
          <p>OTP required before every ride starts</p>
          <p>UPI payment goes directly to the student driver</p>
        </div>
      </section>
    </div>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="soft-panel rounded-[24px] p-3 text-center">
      <div className="mx-auto mb-2 flex justify-center text-white/65">{icon}</div>
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="text-xs text-white/40">{label}</p>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-panel flex items-center gap-3 rounded-[30px] p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/35">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
