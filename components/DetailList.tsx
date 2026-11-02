import type { ReactNode } from "react";

interface DetailListProps {
  items: { label: string; value: ReactNode }[];
}

export default function DetailList({ items }: DetailListProps) {
  return (
    <dl className="rounded-3xl bg-foreground/[0.03] p-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-2 border-t border-foreground/10 px-4 py-4 first:border-t-0 sm:grid-cols-3 sm:gap-4"
        >
          <dt className="text-xs tracking-wide text-muted uppercase sm:pt-0.5">
            {item.label}
          </dt>
          <dd className="min-w-0 sm:col-span-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
