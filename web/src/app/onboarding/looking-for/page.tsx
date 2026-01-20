"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LookingFor =
  | "long_term_partner"
  | "long_term_open_to_short"
  | "short_term_fun"
  | "new_friends"
  | "still_figuring_it_out";

const OPTIONS: { key: LookingFor; title: string; emoji?: string }[] = [
  { key: "long_term_partner", title: "Long-term partner", emoji: "💘" },
  { key: "long_term_open_to_short", title: "Long-term, open to short", emoji: "😍" },
  { key: "short_term_fun", title: "Short-term fun" }, // text-only in your screenshot
  { key: "new_friends", title: "New friends", emoji: "👋" },
  { key: "still_figuring_it_out", title: "Still figuring it out", emoji: "🤔" },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function LookingForPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<LookingFor | null>("long_term_partner");

  const onNext = () => {
    if (!selected) return;
    localStorage.setItem("onboarding_looking_for", selected);
    router.push("/onboarding/education"); // change to your real next route
  };

  return (
    <div className="h-screen bg-[#0b0f14] text-white">
      {/* Top content + scrollable options */}
      <div className="flex h-full flex-col">
        <div className="px-5 pt-6">
          {/* Back + progress */}
          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full p-2 text-white/80 hover:text-white"
              aria-label="Back"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>

            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 bg-[#ff4458]" />
            </div>
          </div>

          <h1 className="text-[42px] leading-[1.05] font-extrabold tracking-tight">
            What are you
            <br />
            looking for?
          </h1>

          <p className="mt-4 text-[18px] leading-7 text-white/55">
            All good if it changes. There&apos;s something
            <br />
            for everyone.
          </p>
        </div>

        {/* Scroll area (cards scroll, button stays pinned) */}
        <div className="flex-1 overflow-y-auto px-5 pb-40 pt-10">
          <div className="space-y-4">
            {OPTIONS.map((opt) => (
              <CardOption
                key={opt.key}
                title={opt.title}
                emoji={opt.emoji}
                selected={selected === opt.key}
                onClick={() => setSelected(opt.key)}
                textOnly={opt.key === "short_term_fun"}
              />
            ))}
          </div>
        </div>

        {/* Bottom pinned Next */}
        <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 pb-8 pt-6">
          <button
            type="button"
            disabled={!selected}
            onClick={onNext}
            className={cn(
              "w-full rounded-full py-4 text-center text-[18px] font-semibold",
              "bg-white text-black",
              !selected && "opacity-50"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function CardOption({
  title,
  emoji,
  selected,
  onClick,
  textOnly,
}: {
  title: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
  textOnly?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border bg-black/70",
        "px-6 py-10",
        selected ? "border-white/25" : "border-white/10"
      )}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {!textOnly && (
          <div className="text-[40px] leading-none">{emoji}</div>
        )}

        <div className={cn("text-white", textOnly ? "text-[20px] font-semibold" : "mt-4 text-[22px] font-medium")}>
          {title}
        </div>
      </div>
    </button>
  );
}
