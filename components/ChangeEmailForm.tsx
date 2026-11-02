"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import Button from "@/components/Button";
import CodeInput from "@/components/CodeInput";
import TextInput from "@/components/TextInput";

const CODE_LENGTH = 6;

export default function ChangeEmailForm() {
  const headingId = useId();
  const sentToId = useId();
  const codeRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>();
  const [codeError, setCodeError] = useState<string>();

  useEffect(() => {
    if (email) codeRef.current?.focus();
  }, [email]);

  const handleSendCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("email");
    if (typeof value === "string") setEmail(value.trim());
  };

  const handleSubmitCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = new FormData(e.currentTarget).get("code");
    if (typeof code !== "string" || code.length !== CODE_LENGTH) {
      setCodeError(`Enter all ${CODE_LENGTH} digits of the code.`);
      codeRef.current?.focus();
      return;
    }
    setCodeError(undefined);
  };

  const actions = (submitLabel: string) => (
    <div className="flex flex-col gap-3">
      <Button type="submit" className="w-full text-lg">
        {submitLabel}
      </Button>
      <Button href="/profile" variant="text" className="w-full">
        Cancel
      </Button>
    </div>
  );

  if (!email) {
    return (
      <form
        aria-labelledby={headingId}
        onSubmit={handleSendCode}
        className="mx-auto flex max-w-md flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h2 id={headingId} className="text-2xl font-bold">
            Change Email
          </h2>
          <p className="text-sm text-muted">
            We'll send a one-time code to your new email address to confirm it's
            yours.
          </p>
        </div>
        <TextInput
          label="New Email Address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        {actions("Send Code")}
      </form>
    );
  }

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmitCode}
      className="mx-auto flex max-w-md flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h2 id={headingId} className="text-2xl font-bold">
          Enter Code
        </h2>
        <p id={sentToId} className="text-sm text-muted">
          We sent a {CODE_LENGTH}-digit code to{" "}
          <span className="break-all text-foreground">{email}</span>.
        </p>
      </div>
      <CodeInput
        ref={codeRef}
        label="One-Time Code"
        name="code"
        length={CODE_LENGTH}
        describedBy={sentToId}
        error={codeError}
      />
      {actions("Submit")}
    </form>
  );
}
