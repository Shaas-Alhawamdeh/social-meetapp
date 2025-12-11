"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DistancePage() {
  const [distance, setDistance] = useState(20);
  const router = useRouter();

  const handleNext = () => {
    if (!distance) return alert("Please set a distance");
    router.push("/onboarding/birthday");
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Your distance preference?</h1>

      {/* Subtitle */}
      <p className="text-gray-500 mb-8">
        Use the slider to set the maximum distance you want potential matches to be located.
      </p>

      {/* Label + value */}
      <div className="flex justify-between text-lg font-medium mb-2">
        <span>Distance Preference</span>
        <span>{distance} mi</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="1"
        max="100"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
        className="w-full accent-black mb-10"
      />

      {/* Skip text */}
      <p className="text-gray-400 text-sm mt-auto mb-4">
        You can change preferences later in Settings
      </p>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="bg-black text-white py-4 rounded-full text-lg w-full"
      >
        Next
      </button>
    </div>
  );
}
