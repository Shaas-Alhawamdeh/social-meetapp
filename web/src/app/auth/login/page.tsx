"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiPost, API_BASE_URL } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // OAuth2PasswordRequestForm expects: username, password
      const body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <Card className="w-full max-w-md border border-neutral-800 bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            Log in to SocialMeet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Email</label>
              <Input
                type="email"
                className="bg-neutral-950 border-neutral-700 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Password</label>
              <Input
                type="password"
                className="bg-neutral-950 border-neutral-700 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-neutral-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

