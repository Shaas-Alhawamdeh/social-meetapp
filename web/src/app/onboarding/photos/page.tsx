"use client";

import { useRouter } from "next/navigation";
import OnboardingProgress from "@/components/ui/OnboardingProgress";

export default function PhotosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-4 pb-8 flex flex-col">
      {/* Progress */}
      <OnboardingProgress step={30} />

      <h1 className="text-3xl font-bold mb-6">Add your recent pics</h1>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-xl border-2 border-dashed border-neutral-700 flex items-center justify-center relative"
          >
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
              +
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-neutral-400 text-sm mt-6 text-center">
        Hey! Let’s add 2 to start. We recommend a face pic.
      </p>

      <button
        disabled
        className="mt-auto w-full py-4 rounded-full bg-neutral-700 text-neutral-400 text-lg font-semibold"
      >
        Next
      </button>
    </div>
  );
}
