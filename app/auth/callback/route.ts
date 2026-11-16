import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Exchanges the code from the Supabase email link for a session.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  // Only allow same-site relative paths.
  const path = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${path}`);
  }
  return NextResponse.redirect(`${origin}/forgot-password?error=invalid-link`);
}
