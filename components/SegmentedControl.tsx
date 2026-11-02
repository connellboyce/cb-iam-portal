interface SegmentedControlProps {
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  disabled?: boolean;
}

export default function SegmentedControl({
  name,
  options,
  defaultValue,
  disabled,
}: SegmentedControlProps) {
  return (
    <div
      className={`inline-flex self-start rounded-full bg-foreground/5 p-1 ${
        disabled ? "opacity-60" : ""
      }`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="cursor-pointer rounded-full px-5 py-2 text-sm text-muted transition-colors has-checked:bg-foreground/15 has-checked:text-foreground has-disabled:cursor-not-allowed has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={option.value === defaultValue}
            disabled={disabled}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
