import {
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

type CalloutVariant = "info" | "warning";

const variantStyles: Record<
  CalloutVariant,
  { container: string; icon: string; glyph: typeof faCircleInfo }
> = {
  info: {
    container: "bg-foreground/5",
    icon: "text-muted",
    glyph: faCircleInfo,
  },
  warning: {
    container: "bg-brand/10",
    icon: "text-brand",
    glyph: faTriangleExclamation,
  },
};

interface CalloutProps {
  variant?: CalloutVariant;
  children: ReactNode;
}

export default function Callout({ variant = "info", children }: CalloutProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl px-5 py-4 ${styles.container}`}
    >
      <FontAwesomeIcon icon={styles.glyph} className={`mt-1 ${styles.icon}`} />
      <p>{children}</p>
    </div>
  );
}
