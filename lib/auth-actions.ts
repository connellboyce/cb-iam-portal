"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ISSUER, signOut } from "@/auth";
import { getSessionToken } from "@/lib/session";

export async function logOut() {
  const requestHeaders = await headers();
  const token = await getSessionToken();

  await signOut({ redirect: false });

  // End the session at the authorization server too; otherwise the next
  // request would silently sign the user straight back in.
  const origin = `${requestHeaders.get("x-forwarded-proto") ?? "http"}://${requestHeaders.get("host")}`;
  const logoutUrl = new URL("/connect/logout", ISSUER);
  if (token?.idToken)
    logoutUrl.searchParams.set("id_token_hint", token.idToken);
  logoutUrl.searchParams.set(
    "client_id",
    process.env.AUTH_CONNELLBOYCE_ID ?? "",
  );
  logoutUrl.searchParams.set("post_logout_redirect_uri", origin);
  redirect(logoutUrl.toString());
}
