import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ComponentProps, type ReactNode, useId } from "react";

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  label: ReactNode;
  description?: string;
}

export default function Checkbox({
  label,
  description,
  ...props
}: CheckboxProps) {
  const descriptionId = useId();

  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-foreground/5 has-checked:bg-brand/10">
      <span className="relative mt-0.5 flex size-5 shrink-0">
        <input
          type="checkbox"
          aria-describedby={description ? descriptionId : undefined}
          className="peer size-5 cursor-pointer appearance-none rounded-md bg-foreground/10 ring-1 ring-foreground/30 transition-colors ring-inset checked:bg-brand checked:ring-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden items-center justify-center text-xs text-foreground peer-checked:flex"
        >
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="break-words">{label}</span>
        {description && (
          <span id={descriptionId} className="text-sm text-muted">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
