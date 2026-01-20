import { NextResponse } from "next/server";

export const runtime = "nodejs"; // safe for server env access

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Missing COLLEGE_SCORECARD_API_KEY in web/.env.local" },
        { status: 500 }
      );
    }

    // Build College Scorecard request
    const url = new URL("https://api.data.gov/ed/collegescorecard/v1/schools");
    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("per_page", "12");
    url.searchParams.set(
      "fields",
      "school.name,school.city,school.state,school.zip,school.school_url"
    );

    // Only US schools are in this API by default.
    // Name search: supports partial text
    if (q.length > 0) {
      url.searchParams.set("school.name", q);
    } else {
      // if empty, return some general list (so your "Nearby schools" can still show something)
      // You can change this behavior later to use real geo-based nearby.
      url.searchParams.set("sort", "latest.student.size:desc");
    }

    const res = await fetch(url.toString(), {
      // Cache lightly; autocomplete still feels instant
      next: { revalidate: 60 * 60 }, // 1 hour
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "College Scorecard request failed", status: res.status, detail: text.slice(0, 300) },
        { status: 502 }
      );
    }

    const data = await res.json();

    const schools: string[] = (data?.results || [])
      .map((r: any) => {
        const name = r?.["school.name"];
        const city = r?.["school.city"];
        const state = r?.["school.state"];
        if (!name) return null;

        // Keep it Tinder-like, clean and short
        return city && state ? `${name} — ${city}, ${state}` : name;
      })
      .filter(Boolean);

    // Deduplicate
    const uniq = Array.from(new Set(schools));

    return NextResponse.json({ schools: uniq });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Unexpected server error", message: e?.message || "unknown" },
      { status: 500 }
    );
  }
}
