import type { ReactNode } from "react";

type BadgeVariant = "muted" | "brand";

const variantClasses: Record<BadgeVariant, string> = {
  muted: "bg-foreground/10 text-muted",
  brand: "bg-brand/15 text-brand ring-1 ring-brand/30 ring-inset",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

export default function Badge({ variant = "muted", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
