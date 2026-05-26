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
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="font-bold text-slate-950">Processing UPI payment</p>
        <p className="mt-1 text-sm text-slate-500">Sending fuel share to {driver}</p>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="flex min-h-screen items-center p-4">
        <div className="w-full rounded-3xl bg-white p-6 text-center shadow-sm">
          <CheckCircle size={58} className="mx-auto mb-4 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-950">Payment sent</h1>
          <p className="mt-2 text-sm text-slate-500">Rs {amount} sent to {driver}</p>
          <div className="my-6 space-y-3 rounded-3xl bg-slate-50 p-4 text-left">
            <Row label="Amount" value={`Rs ${amount}`} />
            <Row label="To" value={driver} />
            <Row label="Status" value="Success" />
            <Row label="Txn ID" value={txnId} />
          </div>
          <button onClick={() => router.push("/home")} className="w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white">
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <ArrowLeft size={16} />
        Back
      </button>

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Paying to</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">{driver}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-emerald-700">
              <ShieldCheck size={15} />
              Verified student
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">
            {driver[0]}
          </div>
        </div>
        <div className="mt-6 rounded-3xl bg-indigo-50 p-5 text-center">
          <p className="text-sm text-indigo-700">Fuel share</p>
          <p className="mt-1 text-5xl font-black text-slate-950">Rs {amount}</p>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Choose UPI app</p>
        <div className="space-y-2">
          {["Google Pay", "PhonePe", "Paytm", "BHIM UPI"].map((app) => (
            <button
              key={app}
              onClick={handlePay}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left"
            >
              <span className="flex items-center gap-3 font-semibold text-slate-900">
                <CreditCard size={17} className="text-indigo-600" />
                {app}
              </span>
              <span className="text-sm font-bold text-indigo-700">Pay</span>
            </button>
          ))}
        </div>
      </section>
      <p className="text-center text-xs text-slate-500">CampusRide charges no fee. Payment goes directly to the driver.</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-bold text-slate-950">{value}</span>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
