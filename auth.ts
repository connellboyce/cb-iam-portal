import NextAuth, { type DefaultSession } from "next-auth";
import { encode } from "next-auth/jwt";
import type { User } from "@/lib/user";

export const ISSUER = "https://auth.connellboyce.com";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    accessToken?: string;
    /** Access token expiry, in seconds since the epoch */
    expiresAt?: number;
    user?: User;
  }
}

interface UserInfo {
  username: string;
  given_name: string;
  family_name: string;
  email: string;
}

async function fetchUserInfo(accessToken: string): Promise<UserInfo> {
  const res = await fetch(`${ISSUER}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Userinfo request failed: ${res.status}`);
  return res.json();
}

// The ID token's `role` claim holds Spring authorities, e.g. `ROLE_ADMIN`
function toRoleIds(authorities: unknown) {
  if (!Array.isArray(authorities)) return [];
  return authorities
    .filter((a): a is string => typeof a === "string" && a.startsWith("ROLE_"))
    .map((a) => a.slice("ROLE_".length).toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: "connellboyce",
      name: "Connell Boyce",
      type: "oidc",
      issuer: ISSUER,
      clientId: process.env.AUTH_CONNELLBOYCE_ID,
      clientSecret: process.env.AUTH_CONNELLBOYCE_SECRET,
      authorization: {
        params: {
          scope: [
            "openid",
            "profile",
            "email",
            "urn:cb:scope:authhub:clients#read",
            "urn:cb:scope:authhub:clients#write",
            "urn:cb:scope:authhub:applications#read",
            "urn:cb:scope:authhub:applications#write",
            "urn:cb:scope:authhub:scopes#read",
          ].join(" "),
        },
      },
    },
  ],
  // Points at a route handler that starts the OAuth flow immediately, so the
  // built-in Auth.js sign-in page is never shown.
  pages: { signIn: "/login" },
  jwt: {
    // Expire the session JWT together with the access token
    encode: (params) =>
      encode({
        ...params,
        maxAge: params.token?.expiresAt
          ? Math.max(0, params.token.expiresAt - Math.floor(Date.now() / 1000))
          : params.maxAge,
      }),
  },
  callbacks: {
    authorized: ({ auth }) => !!auth?.user?.username,
    async jwt({ token, account, profile }) {
      // `account` and `profile` (the ID token claims) are only present at sign-in
      if (account?.access_token && profile?.sub) {
        const userinfo = await fetchUserInfo(account.access_token);
        // Kept server-side only: the ID token for RP-initiated logout, the
        // access token for authhub API calls
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        // Derived by Auth.js from the token response's `expires_in`
        token.expiresAt = account.expires_at;
        token.sub = profile.sub;
        token.user = {
          id: profile.sub,
          username: userinfo.username,
          firstName: userinfo.given_name,
          lastName: userinfo.family_name,
          email: userinfo.email,
          roles: toRoleIds(profile.role),
        };
      }
      // The session lives exactly as long as the access token. Returning null
      // ends it (and clears the cookie wherever cookies can be written).
      if (!token.expiresAt || Date.now() >= token.expiresAt * 1000) return null;
      return token;
    },
    session({ session, token }) {
      if (token.user) session.user = { ...session.user, ...token.user };
      if (token.expiresAt) {
        session.expires = new Date(
          token.expiresAt * 1000,
        ).toISOString() as typeof session.expires;
      }
      return session;
    },
  },
});
