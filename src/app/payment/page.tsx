"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, CreditCard, ShieldCheck } from "lucide-react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "40";
  const driver = searchParams.get("driver") || "Driver";
  const [step, setStep] = useState<"pay" | "processing" | "done">("pay");
  const [txnId, setTxnId] = useState("");

  function handlePay() {
    setStep("processing");
    setTimeout(() => {
      setTxnId(`CR${Date.now().toString().slice(-8)}`);
      setStep("done");
    }, 1200);
  }

  if (step === "processing") {
    return (
      <div className="map-grid flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
          <p className="font-semibold text-white">Processing UPI</p>
          <p className="mt-1 text-sm text-white/45">Sending fuel share directly to {driver}</p>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="map-grid flex min-h-screen items-end p-4">
        <div className="glass-panel w-full rounded-[34px] p-5 text-center">
          <CheckCircle size={62} className="mx-auto mb-4 text-emerald-300" />
          <h2 className="text-3xl font-semibold tracking-tight">Payment sent</h2>
          <p className="mt-2 text-sm text-white/50">
            Rs {amount} was sent to {driver}
          </p>
          <div className="my-6 space-y-3 rounded-[28px] bg-white/[0.06] p-4 text-left">
            <Row label="Amount" value={`Rs ${amount}`} />
            <Row label="To" value={driver} />
            <Row label="Status" value="Success" />
            <Row label="Txn ID" value={txnId} />
          </div>
          <button onClick={() => router.push("/home")} className="w-full rounded-full bg-white py-4 font-bold text-black">
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <button onClick={() => router.back()} className="mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white">
        <ArrowLeft size={18} />
      </button>

      <section className="relative mt-5 overflow-hidden rounded-[34px] bg-[#111] p-5">
        <p className="absolute -left-1 top-12 text-7xl font-black tracking-tight text-white/[0.04]">UPI</p>
        <div className="relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/45">Paying to</p>
              <h1 className="text-3xl font-semibold tracking-tight">{driver}</h1>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-black text-black">
              {driver[0]}
            </div>
          </div>
          <p className="text-sm text-white/45">Fuel share</p>
          <p className="text-6xl font-semibold tracking-tight">Rs {amount}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
            <ShieldCheck size={16} />
            Direct student-to-student payment
          </p>
        </div>
      </section>

      <section className="mt-4 glass-panel rounded-[30px] p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/40">Choose UPI app</p>
        <div className="space-y-2">
          {["Google Pay", "PhonePe", "Paytm", "BHIM UPI"].map((app) => (
            <button
              key={app}
              onClick={handlePay}
              className="flex w-full items-center justify-between rounded-full bg-white/[0.07] px-4 py-4 text-left"
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-white">
                <CreditCard size={17} className="text-white/55" />
                {app}
              </span>
              <span className="text-xs font-bold text-white/45">Rs {amount}</span>
            </button>
          ))}
        </div>
      </section>

      <p className="mt-4 text-center text-xs text-white/35">CampusRide charges no fee and never holds payment.</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-white/40">{label}</span>
      <span className="text-right text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
