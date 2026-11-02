import ProfileMenu from "@/components/ProfileMenu";
import Wordmark from "@/components/Wordmark";
import { fullName, user } from "@/lib/user";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background px-8 py-4 shadow-[0_12px_24px_-12px] shadow-brand/40 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Wordmark className="text-2xl md:text-3xl" />
        <ProfileMenu name={fullName(user)} />
      </div>
    </header>
  );
}
