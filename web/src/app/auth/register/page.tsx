"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiPost("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
      });

      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <Card className="w-full max-w-md border border-neutral-800 bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            Create your SocialMeet account
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
              <label className="text-sm text-neutral-300">Username</label>
              <Input
                className="bg-neutral-950 border-neutral-700 text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              {loading ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-sm text-neutral-400 text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="underline"
                onClick={() => router.push("/auth/login")}
              >
                Log in
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
