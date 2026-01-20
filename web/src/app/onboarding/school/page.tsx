"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type EducationLevel =
  | "in_college"
  | "bachelors"
  | "masters"
  | "phd"
  | "grad_school"
  | string;

export default function SchoolPage() {
  const router = useRouter();

  const [educationLevel, setEducationLevel] = useState<EducationLevel>("in_college");
  const isInCollege = educationLevel === "in_college";

  const [query, setQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load education level from onboarding
  useEffect(() => {
    const lvl = localStorage.getItem("onboarding_education_level") || "in_college";
    setEducationLevel(lvl);
  }, []);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/schools/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data?.schools) ? data.schools : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  const title = isInCollege ? "Where do you go\nto school?" : "Where did you go\nto school?";

  const helperText = isInCollege
    ? "Don't see your school below? Start typing\nto search."
    : "A little school spirit goes a long way in\nmaking unexpected connections.";

  const showNearby = isInCollege && query.trim().length === 0;

  // “Nearby schools” list: use API results when query empty (acts like suggestions)
  const nearby = useMemo(() => {
    const base = results.length ? results : [];
    // make it look like the screenshot: 5 items
    return base.slice(0, 5);
  }, [results]);

  const listToShow = useMemo(() => {
    // When typing, show search results as pills
    if (query.trim().length > 0) return results;
    // When not typing: only show nearby in the "in college" mode
    return showNearby ? nearby : [];
  }, [query, results, showNearby, nearby]);

  const onNext = () => {
    localStorage.setItem("onboarding_school", selectedSchool);
    router.push("/onboarding/next-step"); // change
  };

  const onSkip = () => {
    localStorage.setItem("onboarding_school", "");
    router.push("/onboarding/next-step"); // change
  };

  return (
    <div className="h-screen bg-[#0b0f14] text-white">
      <div className="flex h-full flex-col">
        {/* Top */}
        <div className="px-5 pt-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-full p-2 text-white/80 hover:text-white"
                aria-label="Back"
              >
                <span className="text-2xl leading-none">‹</span>
              </button>

              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 bg-[#ff4458]" />
              </div>
            </div>

            {!isInCollege && (
              <button
                type="button"
                onClick={onSkip}
                className="text-[18px] font-semibold text-white/70 hover:text-white"
              >
                Skip
              </button>
            )}
          </div>

          <h1 className="whitespace-pre-line text-[44px] leading-[1.02] font-extrabold tracking-tight">
            {title}
          </h1>

          {/* Selected school line + underline */}
          <div className="mt-8">
            <div className="text-[22px] text-white/85">{selectedSchool}</div>
            <div className="mt-3 h-px w-full bg-white/15" />
          </div>

          <p className="mt-5 whitespace-pre-line text-[18px] leading-7 text-white/55">
            {helperText}
          </p>

          {isInCollege && (
            <div className="mt-10 text-[20px] font-semibold text-white/50">
              Nearby schools:
            </div>
          )}

          {/* Search input (typing updates results) */}
          <div className="mt-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Start typing to search"
              className={cn(
                "w-full bg-transparent text-[18px] text-white placeholder:text-white/30",
                "outline-none"
              )}
            />
          </div>
        </div>

        {/* Scrollable pills list (so it matches the screenshot behavior) */}
        <div className="flex-1 overflow-y-auto px-5 pb-40 pt-6">
          {loading && query.trim().length > 0 && (
            <div className="text-white/40 text-sm mb-3">Searching…</div>
          )}

          <div className="space-y-3">
            {listToShow.map((school) => {
              const active = selectedSchool === school;
              return (
                <button
                  key={school}
                  type="button"
                  onClick={() => setSelectedSchool(school)}
                  className={cn(
                    "w-full rounded-full border px-5 py-4 text-left",
                    "bg-white/0",
                    active ? "border-white/25 text-white" : "border-white/10 text-white/65"
                  )}
                >
                  <span className="block truncate">{school}</span>
                </button>
              );
            })}

            {/* If not in college, still allow search results list when typing */}
            {!isInCollege && query.trim().length === 0 && (
              <div className="text-white/35 text-sm pt-4">
                Start typing to search US schools.
              </div>
            )}
          </div>
        </div>

        {/* Bottom pinned Next */}
        <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 pb-8 pt-6">
          <button
            type="button"
            onClick={onNext}
            className="w-full rounded-full py-4 text-center text-[18px] font-semibold bg-white text-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
