"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EDUCATION_OPTIONS = [
  "Bachelors",
  "In College",
  "High School",
  "PhD",
  "In Grad School",
  "Masters",
  "Trade School",
  "Prefer Not to Say",
];

export default function EducationPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (!selected) return;

    // TODO: send `selected` to backend later
    router.push("/auth/onboarding/distance");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050509] text-white">
      {/* progress bar */}
      <div className="h-1 w-full bg-neutral-800">
        <div className="h-1 w-2/3 bg-pink-500" />
      </div>

      <div className="flex-1 px-6 pt-8 pb-4 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold leading-tight">
            What's your{" "}
            <br />
            education level?
          </h1>

          <p className="mt-3 text-sm text-neutral-400">
            This will help improve your experience on SocialMeet.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {EDUCATION_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={`rounded-full border px-4 py-2 text-sm transition
                ${
                  selected === option
                    ? "border-pink-500 bg-pink-500 text-white"
                    : "border-neutral-600 text-neutral-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="mt-auto w-full rounded-full py-3 text-lg font-semibold
          disabled:bg-neutral-800 disabled:text-neutral-500
          enabled:bg-white enabled:text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
}
