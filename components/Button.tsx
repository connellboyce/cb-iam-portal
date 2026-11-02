import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "fill" | "light" | "subtle" | "text";
type ButtonSize = "md" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  fill: "bg-brand/15 text-brand ring-1 ring-brand/30 ring-inset hover:bg-brand/25 hover:text-brand-soft hover:ring-brand/50",
  light: "bg-foreground text-background hover:bg-foreground/80",
  subtle: "bg-foreground/10 text-foreground hover:bg-foreground/20",
  text: "text-muted hover:bg-brand/15 hover:text-brand",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2",
  icon: "size-9",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonProps = BaseProps &
  (
    | (ComponentProps<"button"> & { href?: undefined })
    | (ComponentProps<"a"> & { href: string })
  );

export default function Button({
  variant = "fill",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex shrink-0 items-center justify-center gap-2 rounded-full transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (props.href !== undefined) {
    return (
      <Link
        className={classes}
        {...(props as ComponentProps<"a"> & { href: string })}
      />
    );
  }

  const { type = "button", ...buttonProps } = props as ComponentProps<"button">;
  return <button type={type} className={classes} {...buttonProps} />;
}
