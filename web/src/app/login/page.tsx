"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await apiPost("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      setError("Invalid login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-[380px] bg-neutral-900 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email"
              className="bg-neutral-800 border-neutral-700"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              className="bg-neutral-800 border-neutral-700"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500">{error}</p>}

            <Button className="w-full" type="submit">
              Log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
