import { type ComponentProps, type ReactNode, useId } from "react";

interface TextInputProps extends ComponentProps<"input"> {
  label: string;
  hint?: string;
  error?: string;
  action?: (inputId: string) => ReactNode;
}

export default function TextInput({
  label,
  hint,
  error,
  action,
  ...props
}: TextInputProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex items-center justify-between gap-4 rounded-2xl bg-foreground/5 py-4 pr-3 pl-5 transition-shadow focus-within:ring-2 ${
          error
            ? "ring-2 ring-brand focus-within:ring-brand"
            : "focus-within:ring-brand/50"
        }`}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label
            htmlFor={id}
            className="text-xs tracking-wide text-muted uppercase"
          >
            {label}
          </label>
          <input
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="w-full bg-transparent text-lg outline-none"
            {...props}
          />
        </div>
        {action?.(id)}
      </div>
      {hint && (
        <p id={hintId} className="px-5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="px-5 text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
