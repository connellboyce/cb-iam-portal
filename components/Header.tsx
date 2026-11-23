import { Suspense } from "react";
import ProfileMenu from "@/components/ProfileMenu";
import SessionExpiry from "@/components/SessionExpiry";
import Wordmark from "@/components/Wordmark";
import { getSession } from "@/lib/session";
import { fullName, getCurrentUser } from "@/lib/user";

async function HeaderProfileMenu() {
  const [user, session] = await Promise.all([getCurrentUser(), getSession()]);
  return (
    <>
      <ProfileMenu name={fullName(user)} />
      {session && <SessionExpiry expiresAt={Date.parse(session.expires)} />}
    </>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background px-8 py-4 shadow-[0_12px_24px_-12px] shadow-brand/40 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Wordmark className="text-2xl md:text-3xl" />
        <Suspense fallback={<div className="size-9" />}>
          <HeaderProfileMenu />
        </Suspense>
      </div>
    </header>
  );
}
