import { type ComponentProps, useId } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  hint?: string;
  error?: string;
}

export default function TextArea({
  label,
  hint,
  error,
  ...props
}: TextAreaProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-col gap-1 rounded-2xl bg-foreground/5 px-5 py-4 transition-shadow focus-within:ring-2 ${
          error
            ? "ring-2 ring-brand focus-within:ring-brand"
            : "focus-within:ring-brand/50"
        }`}
      >
        <label
          htmlFor={id}
          className="text-xs tracking-wide text-muted uppercase"
        >
          {label}
        </label>
        {hint && (
          <p id={hintId} className="text-sm text-muted">
            {hint}
          </p>
        )}
        <textarea
          id={id}
          rows={5}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="w-full resize-y bg-transparent pt-2 text-lg outline-none"
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="px-5 text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
