import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import IconCircle from "@/components/IconCircle";

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: IconDefinition;
}

export default function LinkCard({
  title,
  description,
  href,
  icon,
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-4 rounded-3xl bg-foreground/5 p-6 transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="flex items-start justify-between gap-4">
        <IconCircle icon={icon} variant="brand" size="md" />
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-muted transition-all group-hover:translate-x-1 group-hover:text-brand"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted">{description}</p>
      </div>
    </Link>
  );
}
