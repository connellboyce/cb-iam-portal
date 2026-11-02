import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconCircleVariant = "brand" | "muted";
type IconCircleSize = "sm" | "md" | "lg";

const variantClasses: Record<IconCircleVariant, string> = {
  brand: "bg-brand/15 text-brand ring-1 ring-brand/30 ring-inset",
  muted: "bg-foreground/5 text-muted",
};

const sizeClasses: Record<IconCircleSize, string> = {
  sm: "size-9 text-sm",
  md: "size-12 text-lg",
  lg: "size-28 text-5xl",
};

interface IconCircleProps {
  icon: IconDefinition;
  variant?: IconCircleVariant;
  size?: IconCircleSize;
  className?: string;
}

export default function IconCircle({
  icon,
  variant = "muted",
  size = "sm",
  className = "",
}: IconCircleProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}
