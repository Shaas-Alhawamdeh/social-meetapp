"use client";

export default function OnboardingProgress({ step }: { step: number }) {
  return (
    <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all"
        style={{ width: `${step}%` }}
      />
    </div>
  );
}
