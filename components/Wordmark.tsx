import Link from "next/link";

interface WordmarkProps {
  className?: string;
}

export default function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-2 ${className}`}
    >
      <span className="font-bold tracking-tight">
        c<span className="text-brand">b</span>
      </span>
      <span className="text-[0.6em] font-medium tracking-wide text-muted transition-colors group-hover:text-foreground">
        identity and access management
      </span>
    </Link>
  );
}
