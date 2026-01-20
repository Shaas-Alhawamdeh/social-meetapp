"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Gender = "man" | "woman" | "beyond_binary";

export default function Page() {
  const router = useRouter();
  const [gender, setGender] = useState<Gender>("man");
  const [showOnProfile, setShowOnProfile] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      
      {/* Top bar */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-2xl opacity-90"
          >
            ←
          </button>

          <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 w-[20%]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-8 flex-1">
        <h1 className="text-[34px] font-semibold tracking-tight mb-3">
          What’s your gender?
        </h1>

        <p className="text-neutral-400 text-[17px] leading-relaxed mb-8">
          Select one to help us show your profile to the right people.
        </p>

        <div className="space-y-4">
          <GenderCard
            label="Man"
            selected={gender === "man"}
            onClick={() => setGender("man")}
          />

          <GenderCard
            label="Woman"
            selected={gender === "woman"}
            onClick={() => setGender("woman")}
          />

          <GenderCard
            label="Beyond Binary"
            selected={gender === "beyond_binary"}
            onClick={() => setGender("beyond_binary")}
          />
        </div>

        <button
          className="mt-5 text-pink-500 text-[15px] font-medium"
          onClick={() => alert("Info modal later")}
        >
          Learn how SocialMeet uses this info
        </button>
      </div>

      {/* Bottom */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setShowOnProfile(v => !v)}
            className={`w-6 h-6 rounded-md border flex items-center justify-center
              ${showOnProfile
                ? "bg-pink-500 border-pink-500"
                : "border-neutral-700"}
            `}
          >
            {showOnProfile && "✓"}
          </button>

          <span className="text-neutral-300 text-[16px]">
            Show gender on profile
          </span>
        </div>

        <button
          onClick={() => router.push("/onboarding/orientation")}
          className="w-full bg-white text-black font-semibold text-[18px] py-4 rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function GenderCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-5 py-5 rounded-2xl border flex items-center justify-between
        ${selected
          ? "border-pink-500 bg-neutral-900"
          : "border-neutral-700 bg-neutral-900/40"}
      `}
    >
      <span className="text-[20px] font-medium">{label}</span>
      <span className={`text-xl ${selected ? "text-pink-500" : "text-transparent"}`}>
        ✓
      </span>
    </button>
  );
}
