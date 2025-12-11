"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const isValidEmail = (value: string) => {
    // simple email check – good enough for UI
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleNext = async () => {
    if (!isValidEmail(email)) return;

    // TODO: optional – send to backend to save/start session
    // await fetch("http://localhost:8000/auth/save-email", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    // go to the next step in your flow
    router.push("/auth/phone"); // or /auth/password, /auth/code, etc.
  };

  const showError = touched && email.length > 0 && !isValidEmail(email);
  const canContinue = isValidEmail(email);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 pt-12">
      {/* close / back */}
      <button
        type="button"
        className="mb-10 text-2xl leading-none"
        onClick={() => router.back()}
      >
        ×
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-3">Your email?</h1>
        <p className="text-sm text-neutral-400 mb-8">
          Don&apos;t lose access to your account, verify your email.
        </p>

        <div className="border-b border-neutral-700 pb-2 mb-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            onBlur={() => setTouched(true)}
            placeholder="Email address"
            className="w-full bg-transparent outline-none text-base placeholder:text-neutral-500"
          />
        </div>

        {showError && (
          <p className="text-xs text-red-400 mt-1">
            Please enter a valid email address.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!canContinue}
        className={`mb-10 w-full py-3 rounded-full text-base font-semibold
          ${canContinue
            ? "bg-white text-black"
            : "bg-neutral-800 text-neutral-500"}
        `}
      >
        Next
      </button>
    </div>
  );
}
