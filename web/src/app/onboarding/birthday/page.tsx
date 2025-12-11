"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BirthdayPage() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (!month || !day || !year) return alert("Please complete your birth date");

    const birthday = `${year}-${month}-${day}`;
    router.push("/onboarding/gender");
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Your b-day?</h1>

      <p className="text-gray-500 mb-8">
        Your profile shows your age, not your birth date.
      </p>

      {/* Input row */}
      <div className="flex gap-4 mb-8">
        <input
          type="number"
          placeholder="MM"
          maxLength={2}
          className="border-b w-16 text-center text-xl p-2"
          onChange={(e) => setMonth(e.target.value.slice(0, 2))}
        />
        <input
          type="number"
          placeholder="DD"
          maxLength={2}
          className="border-b w-16 text-center text-xl p-2"
          onChange={(e) => setDay(e.target.value.slice(0, 2))}
        />
        <input
          type="number"
          placeholder="YYYY"
          maxLength={4}
          className="border-b w-28 text-center text-xl p-2"
          onChange={(e) => setYear(e.target.value.slice(0, 4))}
        />
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="bg-black text-white py-4 rounded-full text-lg mt-auto w-full"
      >
        Next
      </button>
    </div>
  );
}
