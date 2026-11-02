"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ComponentProps, useId, useRef } from "react";
import Button from "@/components/Button";

interface ConfirmButtonProps {
  label: string;
  icon: IconDefinition;
  question: string;
  variant?: ComponentProps<typeof Button>["variant"];
}

export default function ConfirmButton({
  label,
  icon,
  question,
  variant = "text",
}: ConfirmButtonProps) {
  const headingId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <Button
        variant={variant}
        size="icon"
        aria-label={label}
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
          noRef.current?.focus();
        }}
      >
        <FontAwesomeIcon icon={icon} className="text-sm" />
      </Button>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; keyboard users close with Escape or No */}
      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-sm scale-95 rounded-3xl bg-background p-6 text-left text-foreground opacity-0 shadow-[0_0_48px_-12px] shadow-brand/40 transition-[opacity,scale,display,overlay] transition-discrete duration-200 ease-out backdrop:bg-background/70 open:scale-100 open:opacity-100 motion-reduce:transition-none starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="flex flex-col gap-6">
          <h2 id={headingId} className="text-xl font-bold">
            {question}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <Button ref={noRef} className="sm:flex-1" onClick={close}>
              No
            </Button>
            <Button variant="text" className="sm:flex-1" onClick={close}>
              Yes
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
