"use client";

import { useApp } from "@/context/AppContext";
import { Award, Mail, ShieldCheck, Star, TrendingUp } from "lucide-react";

export default function ProfilePage() {
  const { user, bookings, rides, selectedCollege } = useApp();
  const myRides = rides.filter((ride) => ride.driverId === user.uid);

  return (
    <div className="space-y-4 p-4">
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-700">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-950">{user.name}</h1>
            <p className="text-sm text-slate-500">{user.department} / Year {user.year}</p>
            <p className="text-xs text-slate-500">{selectedCollege.name}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          <ShieldCheck size={17} />
          College email verified
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <Metric icon={<Star size={17} />} value={`${user.rating}`} label="rating" />
        <Metric icon={<TrendingUp size={17} />} value={`${user.reliabilityScore}%`} label="reliable" />
        <Metric icon={<Award size={17} />} value="OTP" label="safety" />
      </div>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
            <Mail size={17} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">College email</p>
            <p className="font-semibold text-slate-950">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-3">
          <Mini label="Taken" value={`${bookings.length}`} />
          <Mini label="Offered" value={`${myRides.length}`} />
          <Mini label="CO2 saved" value={`${(bookings.length * 2.1).toFixed(1)} kg`} />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold text-slate-950">Trust signals</h2>
        <div className="space-y-2 text-sm text-slate-600">
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
    <div className="rounded-3xl bg-white p-3 text-center shadow-sm">
      <div className="mx-auto mb-1 flex justify-center text-indigo-600">{icon}</div>
      <p className="text-lg font-bold text-slate-950">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
