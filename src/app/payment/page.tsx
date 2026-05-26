"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "40";
  const driver = searchParams.get("driver") || "Driver";
  const [step, setStep] = useState<"pay" | "processing" | "done">("pay");

  function handlePay() {
    setStep("processing");
    setTimeout(() => setStep("done"), 2000);
  }

  if (step === "processing") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-gray-600 font-medium">Processing payment...</p>
        <p className="text-xs text-gray-400 mt-1">Contacting UPI</p>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-green-50 rounded-2xl p-8 text-center w-full max-w-sm">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Payment sent!</h2>
          <p className="text-sm text-gray-500 mb-2">₹{amount} sent to {driver}</p>
          <p className="text-xs text-gray-400 mb-6">via UPI · {new Date().toLocaleTimeString()}</p>
          <div className="bg-white rounded-xl p-4 border border-green-100 mb-6 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold text-gray-900">₹{amount}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">To</span>
              <span className="font-semibold text-gray-900">{driver}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Status</span>
              <span className="font-semibold text-green-600">Success</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Txn ID</span>
              <span className="font-mono text-xs text-gray-400">CR{Date.now().toString().slice(-8)}</span>
            </div>
          </div>
          <button
            onClick={() => router.push("/home")}
            className="w-full bg-purple-600 text-white rounded-xl py-3 font-medium"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <button onClick={() => router.back()} className="text-gray-400 text-sm mb-6 pt-2 text-left">
        ← Back
      </button>

      <h1 className="text-xl font-semibold text-gray-900 mb-1">Pay fuel share</h1>
      <p className="text-sm text-gray-500 mb-8">Split the cost directly with your driver</p>

      <div className="bg-gray-50 rounded-2xl p-6 text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Paying to</p>
        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xl font-bold mx-auto mb-2">
          {driver[0]}
        </div>
        <p className="font-semibold text-gray-900">{driver}</p>
        <p className="text-xs text-gray-400 mb-4">Verified student · RV College</p>
        <p className="text-4xl font-bold text-gray-900">₹{amount}</p>
        <p className="text-xs text-gray-400 mt-1">fuel share</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6">
        <p className="text-xs font-medium text-gray-500 mb-3">Pay via UPI</p>
        <div className="space-y-2">
          {["Google Pay", "PhonePe", "Paytm", "BHIM UPI"].map(app => (
            <button
              key={app}
              onClick={handlePay}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 active:scale-95 transition-transform"
            >
              <span className="text-sm font-medium text-gray-700">{app}</span>
              <span className="text-xs text-purple-600 font-medium">Pay ₹{amount} →</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        Payments go directly to driver · CampusRide charges no fee
      </p>
    </div>
  );
}