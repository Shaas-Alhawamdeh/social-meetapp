"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 flex flex-col">
      <button onClick={() => router.back()} className="text-xl mb-6">
        ←
      </button>

      <h1 className="text-3xl font-bold mb-2">Can we get your number?</h1>

      <p className="text-sm opacity-70 mb-6">
        By entering your number, you agree to receive verification codes and updates.
      </p>

      <div className="flex items-center gap-2 bg-neutral-800 p-4 rounded-xl mb-6">
        <span className="text-lg">US +1</span>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          className="flex-1 bg-transparent outline-none text-lg"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button
        disabled={phone.length < 10}
        onClick={() => router.push(`/auth/code?ph=${phone}`)}
        className={`w-full py-4 rounded-full font-semibold ${
          phone.length < 10 ? "bg-neutral-700 text-neutral-500" : "bg-white text-black"
        }`}
      >
        Next
      </button>
    </div>
  );
}
