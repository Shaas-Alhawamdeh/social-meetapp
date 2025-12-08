"use client";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-pink-500 to-orange-400 text-white p-6">
      <div></div>

      <div className="text-center">
        <h1 className="text-4xl font-bold leading-tight">
          It Starts<br />with a <span className="font-extrabold">Swipe</span>
        </h1>
        <p className="mt-4 text-sm opacity-90">
          By tapping 'Create account' or 'Sign in' you agree to our Terms.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button className="w-full py-4 bg-white text-black rounded-full font-semibold">
          Sign in with Apple
        </button>

        <button className="w-full py-4 bg-white text-black rounded-full font-semibold">
          Sign in with Google
        </button>

        <button
          onClick={() => (window.location.href = "/auth/phone")}
          className="w-full py-4 bg-white text-black rounded-full font-semibold"
        >
          Sign in with Phone Number
        </button>

        <p className="text-center text-sm opacity-90 mb-4">Trouble signing in?</p>
      </div>
    </div>
  );
}
