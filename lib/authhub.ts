import { redirect } from "next/navigation";
import { ISSUER } from "@/auth";
import { getSessionToken } from "@/lib/session";

const API_BASE = new URL("/api/v1/", ISSUER);

// `/login` discards the current session before starting a fresh sign-in
const REAUTHENTICATE = "/login";

function isInvalidToken(res: Response) {
  return (
    res.status === 401 &&
    /\berror="?invalid_token"?/.test(res.headers.get("WWW-Authenticate") ?? "")
  );
}

/**
 * Calls the authhub API as the signed-in user. If the access token is missing,
 * expired, or rejected as invalid (e.g. revoked), the session is ended and the
 * user is sent back through sign-in.
 */
export async function authhubFetch(path: string, init?: RequestInit) {
  const token = await getSessionToken();
  if (!token?.accessToken) redirect(REAUTHENTICATE);

  const requestHeaders = new Headers(init?.headers);
  requestHeaders.set("Authorization", `Bearer ${token.accessToken}`);
  const res = await fetch(new URL(path, API_BASE), {
    ...init,
    headers: requestHeaders,
  });

  if (isInvalidToken(res)) redirect(REAUTHENTICATE);
  return res;
}

export class AuthhubError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AuthhubError";
  }
}

// Management endpoints return RFC 9457 problem details; client registration
// returns RFC 7591 errors
async function errorMessage(res: Response) {
  try {
    const body = await res.json();
    return (
      body.detail ?? body.error_description ?? body.error ?? res.statusText
    );
  } catch {
    return res.statusText;
  }
}

/** Sends JSON to the authhub API and parses the JSON response. */
export async function authhubRequest<T>(
  path: string,
  { body, ...init }: Omit<RequestInit, "body"> & { body?: unknown } = {},
): Promise<T> {
  const requestHeaders = new Headers(init.headers);
  requestHeaders.set("Accept", "application/json");
  if (body !== undefined)
    requestHeaders.set("Content-Type", "application/json");

  const res = await authhubFetch(path, {
    ...init,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new AuthhubError(res.status, await errorMessage(res));
  return (res.status === 204 ? undefined : await res.json()) as T;
}

/** Like `authhubRequest`, but resolves to null when the resource doesn't exist. */
export async function authhubFind<T>(path: string): Promise<T | null> {
  try {
    return await authhubRequest<T>(path);
  } catch (e) {
    if (e instanceof AuthhubError && e.status === 404) return null;
    throw e;
  }
}
