"use client";

import {
  faRightFromBracket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useRef, useState } from "react";
import Button from "@/components/Button";

interface ProfileMenuProps {
  name: string;
}

export default function ProfileMenu({ name }: ProfileMenuProps) {
  const dialogId = useId();
  const headingId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.closing !== undefined) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }

    const finish = () => {
      clearTimeout(fallback);
      dialog.removeEventListener("transitionend", handleEnd);
      dialog.close();
      delete dialog.dataset.closing;
    };
    const handleEnd = (e: TransitionEvent) => {
      if (e.target === dialog && e.propertyName === "translate") finish();
    };
    const fallback = setTimeout(finish, 400);
    dialog.addEventListener("transitionend", handleEnd);
    dialog.dataset.closing = "";
  };

  return (
    <>
      <Button
        aria-label="Profile menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        className="text-lg"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faUser} />
      </Button>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; keyboard users close with Escape or the close button */}
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={headingId}
        onClose={() => setOpen(false)}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="fixed inset-y-0 right-0 left-auto m-0 h-full max-h-none w-80 max-w-[85vw] translate-x-full bg-background text-foreground shadow-[-12px_0_24px_-12px] shadow-brand/40 transition-[translate,display,overlay] transition-discrete duration-250 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[translate] backdrop:bg-background/60 backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-250 backdrop:ease-out open:translate-x-0 open:backdrop:opacity-100 open:data-closing:translate-x-full open:data-closing:backdrop:opacity-0 motion-reduce:transition-none motion-reduce:backdrop:transition-none starting:open:translate-x-full starting:open:backdrop:opacity-0"
      >
        <div className="flex h-full flex-col gap-8 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id={headingId} className="text-2xl font-bold">
              Hello, {name}
            </h2>
            <Button
              variant="text"
              size="icon"
              aria-label="Close profile menu"
              onClick={close}
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <Button variant="subtle" className="mt-auto w-full">
            <FontAwesomeIcon icon={faRightFromBracket} />
            Log Out
          </Button>
        </div>
      </dialog>
    </>
  );
}
