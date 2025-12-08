"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BirthdayPage() {
  const [birthday, setBirthday] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (!birthday) return alert("Please enter your birthday");

    router.push("/onboarding/gender");
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6">When's your birthday?</h1>

      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        className="border p-4 rounded-lg text-lg"
      />

      <button
        onClick={handleNext}
        className="bg-red-500 text-white p-4 mt-6 rounded-lg text-lg"
      >
        Continue
      </button>
    </div>
  );
}
