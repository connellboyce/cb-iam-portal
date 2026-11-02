import { type ReactNode, useId } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <h2 id={headingId} className="px-1 text-xl font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}
