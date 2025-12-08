"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CodePage() {
  const params = useSearchParams();
  const router = useRouter();
  const phone = params.get("ph");

  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 flex flex-col">
      <button onClick={() => router.back()} className="text-xl mb-6">←</button>

      <h1 className="text-3xl font-bold mb-2">Enter your code</h1>
      <p className="opacity-70 mb-4">{phone}</p>

      <input
        type="tel"
        inputMode="numeric"
        maxLength={6}
        placeholder="______"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="text-4xl tracking-[0.5em] text-center bg-transparent outline-none my-10"
      />

      <button
        disabled={code.length < 6}
        onClick={() => router.push("/auth/profile")}
        className={`w-full py-4 rounded-full font-semibold ${
          code.length < 6 ? "bg-neutral-700 text-neutral-500" : "bg-white text-black"
        }`}
      >
        Next
      </button>

      <p className="mt-6 underline text-blue-400">Resend</p>
    </div>
  );
}
