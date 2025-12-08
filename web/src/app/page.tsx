export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">SocialMeet</h1>
      <a href="/auth/register" className="px-6 py-2 bg-black text-white rounded">
        Create Account
      </a>
      <a href="/auth/login" className="px-6 py-2 border rounded">
        Login
      </a>
    </main>
  );
}
