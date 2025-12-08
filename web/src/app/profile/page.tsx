"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  return (
    <div className="min-h-screen bg-white text-black p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Create your profile</h1>

      <div className="flex flex-col gap-4">
        <input
          className="border p-4 rounded-xl"
          placeholder="First name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />

        <input
          className="border p-4 rounded-xl"
          placeholder="Last name"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
      </div>

      <button
        disabled={!first || !last}
        className={`mt-auto py-4 rounded-full font-semibold ${
          !first || !last
            ? "bg-neutral-300 text-neutral-400"
            : "bg-black text-white"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
