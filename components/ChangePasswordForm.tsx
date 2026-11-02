"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";

export default function ChangePasswordForm() {
  const headingId = useId();
  const confirmRef = useRef<HTMLInputElement>(null);
  const [mismatch, setMismatch] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("newPassword") !== data.get("confirmPassword")) {
      setMismatch(true);
      confirmRef.current?.focus();
      return;
    }
    setMismatch(false);
  };

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h2 id={headingId} className="text-2xl font-bold">
          Change Password
        </h2>
        <p className="text-sm text-muted">All fields are required.</p>
      </div>
      <PasswordInput
        label="Current Password"
        name="currentPassword"
        autoComplete="current-password"
        required
      />
      <div className="flex flex-col gap-3">
        <PasswordInput
          label="New Password"
          name="newPassword"
          autoComplete="new-password"
          required
        />
        <PasswordInput
          ref={confirmRef}
          label="Repeat New Password"
          name="confirmPassword"
          autoComplete="new-password"
          required
          error={mismatch ? "Passwords do not match." : undefined}
          onChange={() => setMismatch(false)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full text-lg">
          Change Password
        </Button>
        <Button href="/security" variant="text" className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  );
}
