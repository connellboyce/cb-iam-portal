"use client";

import {
  type ClipboardEvent,
  type KeyboardEvent,
  type Ref,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface CodeInputProps {
  label: string;
  name: string;
  length?: number;
  describedBy?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export default function CodeInput({
  label,
  name,
  length = 6,
  describedBy,
  error,
  ref,
}: CodeInputProps) {
  const errorId = useId();
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length }, () => ""),
  );
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useImperativeHandle(ref, () => {
    const firstEmpty = digits.findIndex((digit) => !digit);
    return inputs.current[
      firstEmpty === -1 ? 0 : firstEmpty
    ] as HTMLInputElement;
  }, [digits]);

  const fill = (start: number, value: string) => {
    const chars = value
      .replace(/\D/g, "")
      .slice(0, length - start)
      .split("");
    if (chars.length === 0) return;
    setDigits((current) => {
      const next = [...current];
      chars.forEach((char, offset) => {
        next[start + offset] = char;
      });
      return next;
    });
    inputs.current[Math.min(start + chars.length, length - 1)]?.focus();
  };

  const clear = (index: number) => {
    setDigits((current) => current.map((d, i) => (i === index ? "" : d)));
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      clear(index - 1);
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fill(index, e.clipboardData.getData("text"));
  };

  return (
    <fieldset
      aria-describedby={
        [describedBy, error && errorId].filter(Boolean).join(" ") || undefined
      }
      className="flex flex-col gap-2"
    >
      <legend className="mb-2 px-1 text-xs tracking-wide text-muted uppercase">
        {label}
      </legend>
      <div className="grid auto-cols-fr grid-flow-col gap-2">
        {digits.map((digit, index) => (
          <input
            // biome-ignore lint/suspicious/noArrayIndexKey: the boxes are fixed positions
            key={index}
            ref={(el) => {
              inputs.current[index] = el;
            }}
            value={digit}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={error ? true : undefined}
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              e.target.value ? fill(index, e.target.value) : clear(index)
            }
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            className={`h-14 w-full min-w-0 rounded-xl bg-foreground/5 text-center text-2xl outline-none transition-shadow focus:ring-2 ${
              error ? "ring-2 ring-brand" : "focus:ring-brand/50"
            }`}
          />
        ))}
      </div>
      <input type="hidden" name={name} value={digits.join("")} />
      {error && (
        <p id={errorId} role="alert" className="px-1 text-sm text-brand">
          {error}
        </p>
      )}
    </fieldset>
  );
}
