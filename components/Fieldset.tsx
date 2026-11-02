import { type ComponentProps, type ReactNode, useId } from "react";

interface FieldsetProps extends ComponentProps<"fieldset"> {
  legend: string;
  description?: string;
  error?: string;
  children: ReactNode;
}

export default function Fieldset({
  legend,
  description,
  error,
  children,
  ...props
}: FieldsetProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy =
    [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <fieldset aria-describedby={describedBy} {...props}>
      <legend className="mb-1 px-1 text-xl font-bold">{legend}</legend>
      <div className="flex flex-col gap-3">
        {description && (
          <p id={descriptionId} className="px-1 text-sm text-muted">
            {description}
          </p>
        )}
        {children}
        {error && (
          <p id={errorId} role="alert" className="px-1 text-sm text-brand">
            {error}
          </p>
        )}
      </div>
    </fieldset>
  );
}
