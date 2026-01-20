"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type OptionKey =
  | "straight"
  | "gay"
  | "lesbian"
  | "bisexual"
  | "asexual"
  | "demisexual"
  | "pansexual";

const OPTIONS: {
  key: OptionKey;
  title: string;
  description: string;
}[] = [
  {
    key: "straight",
    title: "Straight",
    description:
      "A person who is exclusively attracted to members of the opposite gender",
  },
  {
    key: "gay",
    title: "Gay",
    description:
      "A person who is emotionally, romantically, or sexually attracted to people of the same gender",
  },
  {
    key: "lesbian",
    title: "Lesbian",
    description:
      "A woman who is emotionally, romantically, or sexually attracted to women",
  },
  {
    key: "bisexual",
    title: "Bisexual",
    description:
      "A person who has potential for emotional, romantic, or sexual attraction to people of more than one gender",
  },
  {
    key: "asexual",
    title: "Asexual",
    description: "A person who does not experience sexual attraction",
  },
  {
    key: "demisexual",
    title: "Demisexual",
    description:
      "A person who does not experience sexual attraction unless they form a strong emotional connection",
  },
  {
    key: "pansexual",
    title: "Pansexual",
    description:
      "A person who is attracted to others regardless of gender identity",
  },
];

export default function Page() {
  const router = useRouter();

  const [selected, setSelected] = useState<OptionKey[]>(["straight"]);
  const [showOnProfile, setShowOnProfile] = useState<boolean>(true);

  const toggle = (key: OptionKey) => {
    setSelected((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  const onNext = () => {
    // Save later
    router.push("/onboarding/interested");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top bar */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-2xl text-white"
          >
            ←
          </button>

          <button
            onClick={onNext}
            className="text-neutral-400 text-lg font-semibold"
          >
            Skip
          </button>
        </div>

        <div className="mt-3 h-[3px] bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-pink-500 w-[28%]" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-8 flex-1 overflow-y-auto">
        <h1 className="text-[40px] leading-[44px] font-semibold mb-3">
          What’s your sexual orientation?
        </h1>

        <p className="text-neutral-400 text-[18px] mb-8">
          Select all that describe you to reflect your identity
        </p>

        <div className="space-y-4">
          {OPTIONS.map((opt) => (
            <Card
              key={opt.key}
              title={opt.title}
              description={opt.description}
              selected={selected.includes(opt.key)}
              onClick={() => toggle(opt.key)}
            />
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setShowOnProfile((v) => !v)}
            className={`w-7 h-7 rounded-md border flex items-center justify-center
              ${
                showOnProfile
                  ? "bg-pink-500 border-pink-500"
                  : "border-neutral-700"
              }`}
          >
            {showOnProfile ? "✓" : ""}
          </button>

          <span className="text-neutral-300 text-[18px]">
            Show sexual orientation on profile
          </span>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-white text-black font-semibold text-[20px] py-4 rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-6 py-5 border flex items-start justify-between text-left transition
        ${
          selected
            ? "border-pink-500 bg-neutral-900"
            : "border-neutral-700 bg-neutral-900/40"
        }`}
    >
      <div>
        <div className="text-[20px] font-semibold mb-1">{title}</div>
        <div className="text-neutral-400 text-[15px] leading-snug">
          {description}
        </div>
      </div>

      <div
        className={`text-2xl font-bold ml-4 ${
          selected ? "text-pink-500" : "text-transparent"
        }`}
      >
        ✓
      </div>
    </button>
  );
}
