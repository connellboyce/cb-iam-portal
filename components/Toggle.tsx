import { type ComponentProps, useId } from "react";

interface ToggleProps extends Omit<ComponentProps<"input">, "type" | "role"> {
  label: string;
  description?: string;
}

export default function Toggle({ label, description, ...props }: ToggleProps) {
  const descriptionId = useId();

  return (
    <label className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-foreground/5 px-5 py-4">
      <span className="flex flex-col gap-1">
        <span className="text-lg">{label}</span>
        {description && (
          <span id={descriptionId} className="text-sm text-muted">
            {description}
          </span>
        )}
      </span>
      <input
        type="checkbox"
        // biome-ignore lint/a11y/useAriaPropsForRole: a native checkbox exposes its checked state; ARIA in HTML says not to add aria-checked
        role="switch"
        aria-describedby={description ? descriptionId : undefined}
        className="sr-only"
        {...props}
      />
      <span
        aria-hidden="true"
        className="relative h-7 w-12 shrink-0 rounded-full bg-foreground/15 transition-colors group-has-checked:bg-brand/50 group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-brand"
      >
        <span className="absolute top-1 left-1 size-5 rounded-full bg-muted transition-all group-has-checked:translate-x-5 group-has-checked:bg-brand-soft" />
      </span>
    </label>
  );
}
