"use client";

import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

interface CopyFieldProps {
  label: string;
  value: string;
}

export default function CopyField({ label, value }: CopyFieldProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    if (status !== "copied") return;
    const timeout = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timeout);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="px-1 text-xs tracking-wide text-muted uppercase">
        {label}
      </span>
      <button
        type="button"
        onClick={copy}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-foreground/5 py-4 pr-4 pl-5 text-left transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <code className="min-w-0 font-mono text-sm break-all select-all">
          {value}
        </code>
        <span
          className={`flex shrink-0 items-center gap-2 text-sm transition-colors ${
            status === "copied"
              ? "text-brand"
              : "text-muted group-hover:text-foreground"
          }`}
        >
          <FontAwesomeIcon icon={status === "copied" ? faCheck : faCopy} />
          {status === "copied" ? "Copied" : "Copy"}
        </span>
      </button>
      <p aria-live="polite" className="px-1 text-sm text-brand">
        {status === "failed" &&
          "Couldn't copy automatically. Select the text and copy it manually."}
        <span className="sr-only">
          {status === "copied" && `${label} copied to clipboard`}
        </span>
      </p>
    </div>
  );
}
