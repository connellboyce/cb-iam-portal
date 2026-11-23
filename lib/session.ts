import { headers } from "next/headers";
import { connection } from "next/server";
import { getToken } from "next-auth/jwt";
import { cache } from "react";
import { auth } from "@/auth";

export const getSession = cache(async () => {
  // Auth.js generates random values (e.g. a CSRF token) while reading the
  // session, so mark this as request-time work for Cache Components
  await connection();
  return auth();
});

// The raw session JWT, including the tokens deliberately left out of the
// session object. Server-only.
export async function getSessionToken() {
  const requestHeaders = await headers();
  return getToken({
    req: { headers: requestHeaders },
    secret: process.env.AUTH_SECRET,
    secureCookie: requestHeaders.get("x-forwarded-proto") === "https",
  });
}
