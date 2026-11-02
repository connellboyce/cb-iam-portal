import { cacheLife } from "next/cache";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";

const links = [
  { title: "Terms of Service", href: "#" },
  { title: "Privacy Policy", href: "#" },
];

export default async function Footer() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="bg-background px-8 py-8 shadow-[0_-12px_24px_-12px] shadow-brand/40 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <Wordmark className="text-xl" />
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Connell Boyce. All rights
            reserved.
          </p>
        </div>
        <nav className="flex gap-6 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="transition-colors hover:text-brand"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
