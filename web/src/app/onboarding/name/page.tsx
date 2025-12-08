"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NamePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (!name) return alert("Please enter your name");

    // In the future: send to backend
    router.push("/onboarding/birthday");
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6">What's your first name?</h1>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
