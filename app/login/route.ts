import type { NextRequest } from "next/server";
import { signIn, signOut } from "@/auth";

export async function GET(request: NextRequest) {
  // Anything that lands here needs a new session, e.g. after the access token
  // was rejected, so drop whatever is left of the old one first
  await signOut({ redirect: false });
  await signIn("connellboyce", {
    redirectTo: request.nextUrl.searchParams.get("callbackUrl") ?? "/",
  });
}
