export default async function Page() {
  const res = await fetch("http://localhost:8000/ping", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Backend Response:</h1>
      <p className="mt-4">{data.message}</p>
    </div>
  );
}