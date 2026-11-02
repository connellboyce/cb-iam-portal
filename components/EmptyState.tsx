import type { ReactNode } from "react";

interface EmptyStateProps {
  children: ReactNode;
}

export default function EmptyState({ children }: EmptyStateProps) {
  return <p className="px-1 text-sm text-muted">{children}</p>;
}
