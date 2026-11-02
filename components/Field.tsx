import {
  faArrowUpRightFromSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { ReactNode } from "react";

interface FieldProps {
  label?: string;
  value?: ReactNode;
  href?: string;
  action?: ReactNode;
}

const baseClasses =
  "flex items-center justify-between gap-4 rounded-2xl bg-foreground/5 py-4 pr-3 pl-5";

export default function Field({ label, value, href, action }: FieldProps) {
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${baseClasses} group transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}
      >
        <span className="text-lg">
          {label}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </span>
        <span className="flex size-9 items-center justify-center text-sm text-muted transition-colors group-hover:text-brand">
          <FontAwesomeIcon
            icon={external ? faArrowUpRightFromSquare : faChevronRight}
          />
        </span>
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      <div className="flex min-w-0 flex-col gap-1">
        {label && (
          <span className="text-xs tracking-wide text-muted uppercase">
            {label}
          </span>
        )}
        <span className="truncate text-lg">{value}</span>
      </div>
      {action}
    </div>
  );
}
