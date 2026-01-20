"use client";

import { useRouter } from "next/navigation";

export default function RulesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col px-6 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome to <span className="text-red-500">SocialMeet</span>.
        </h1>
        <p className="opacity-70 text-lg">
          Please follow these Community Guidelines.
        </p>
      </div>

      {/* Rules */}
      <div className="space-y-6 flex-1">
        <Rule
          title="Be yourself."
          text="Make sure your photos, age, and bio reflect who you truly are."
        />

        <Rule
          title="Stay safe."
          text="Don’t share personal information too quickly. Meet in public places."
        />

        <Rule
          title="Play it cool."
          text="Respect others and treat people the way you want to be treated."
        />

        <Rule
          title="Be proactive."
          text="Report inappropriate behavior to keep SocialMeet safe."
        />
      </div>

      {/* Agree Button */}
      <button
        onClick={() => router.push("/onboarding/name")}
        className="bg-white text-black font-semibold text-lg py-4 rounded-full mt-8"
      >
        I agree
      </button>
    </div>
  );
}

function Rule({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="font-semibold text-xl mb-1">{title}</h2>
      <p className="opacity-70 leading-relaxed">{text}</p>
    </div>
  );
}
