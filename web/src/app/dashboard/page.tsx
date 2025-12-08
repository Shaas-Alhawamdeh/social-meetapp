"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="text-white p-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold">Welcome to SocialMeet</h1>
      <p className="mt-4 text-xl">Logged in as: {user.username}</p>
    </div>
  );
}
