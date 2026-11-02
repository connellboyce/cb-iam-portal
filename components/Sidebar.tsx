"use client";

import {
  faCode,
  faShieldHalved,
  faUser,
  faUserGear,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconCircle from "@/components/IconCircle";

const items = [
  { title: "Profile", href: "/profile", icon: faUser },
  { title: "Security", href: "/security", icon: faShieldHalved },
  { title: "Roles & Access", href: "/access", icon: faUserShield },
  { title: "Developer", href: "/developer", icon: faCode },
  { title: "Admin", href: "/admin", icon: faUserGear },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="md:w-60 md:shrink-0">
      <nav aria-label="Portal">
        <ul className="grid grid-cols-5 gap-1 md:flex md:flex-col md:gap-2">
          {items.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-center text-[11px] leading-tight transition-colors md:flex-row md:gap-3 md:rounded-full md:py-2 md:pr-5 md:pl-2 md:text-left md:text-base md:whitespace-nowrap ${
                    active
                      ? "bg-foreground/5 text-foreground"
                      : "text-muted hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <IconCircle
                    icon={item.icon}
                    variant={active ? "brand" : "muted"}
                    className="group-hover:text-brand"
                  />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
