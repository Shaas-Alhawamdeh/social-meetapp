"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Choice = "men" | "women" | "beyond_binary" | "everyone";

const OPTIONS: { key: Choice; label: string }[] = [
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "beyond_binary", label: "Beyond Binary" },
  { key: "everyone", label: "Everyone" },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function InterestedPage() {
  const router = useRouter();

  // default like your screenshot (Women selected)
  const [selected, setSelected] = useState<Choice[]>(["women"]);

  const isValid = selected.length > 0;

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggle = (key: Choice) => {
    setSelected((prev) => {
      const set = new Set(prev);

      // If they tap "Everyone", make it exclusive
      if (key === "everyone") {
        return set.has("everyone") ? [] : ["everyone"];
      }

      // If they tap a specific option while "Everyone" is selected, remove Everyone first
      if (set.has("everyone")) set.delete("everyone");

      if (set.has(key)) set.delete(key);
      else set.add(key);

      return Array.from(set) as Choice[];
    });
  };

  const onNext = () => {
    // Save wherever you store onboarding (context/zustand/db).
    // Minimal: localStorage (so you can use it later in onboarding flow)
    localStorage.setItem("onboarding_interested_in", JSON.stringify(selected));

    // route to your next onboarding step
    router.push("/onboarding/distance"); // <-- change this to your real next route
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      {/* Top safe area spacing */}
      <div className="px-5 pt-10 pb-32">
        <h1 className="text-[38px] leading-[1.05] font-extrabold tracking-tight">
          Who are you
          <br />
          interested in seeing?
        </h1>

        <p className="mt-4 text-[16px] leading-6 text-white/60">
          Select all that apply to help us
          <br />
          recommend the right people for you.
        </p>

        <div className="mt-8 space-y-4">
          {OPTIONS.map((opt) => (
            <InterestOption
              key={opt.key}
              label={opt.label}
              selected={selectedSet.has(opt.key)}
              onClick={() => toggle(opt.key)}
            />
          ))}

          <button
            type="button"
            className="mt-2 text-left text-[15px] text-sky-400"
            onClick={() => router.push("/privacy/tinder-uses-this-info")} // optional
          >
            Learn how Tinder uses this info
          </button>
        </div>
      </div>

      {/* Bottom pinned Next */}
      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-8 pt-6">
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className={cn(
            "w-full rounded-full py-4 text-center text-[18px] font-semibold",
            "bg-white text-black",
            !isValid && "opacity-50"
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function InterestOption({
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
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border px-5 py-5 text-left",
        "bg-[#0e141b]",
        selected ? "border-[#ff4458]" : "border-white/15"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-semibold">{label}</span>

        {/* Checkmark (only when selected) */}
        <span
          className={cn(
            "text-[#ff4458] transition-opacity",
            selected ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        >
          ✓
        </span>
      </div>
    </button>
  );
}
