"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Field from "@/components/Field";
import TextArea from "@/components/TextArea";
import type { Role } from "@/lib/roles";

interface RoleRequestFormProps {
  role: Role;
}

export default function RoleRequestForm({ role }: RoleRequestFormProps) {
  const headingId = useId();
  const justificationRef = useRef<HTMLTextAreaElement>(null);
  const [missingJustification, setMissingJustification] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const justification = new FormData(e.currentTarget).get("justification");
    if (typeof justification !== "string" || !justification.trim()) {
      setMissingJustification(true);
      justificationRef.current?.focus();
      return;
    }
    setMissingJustification(false);
  };

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h2 id={headingId} className="text-2xl font-bold">
          Request Role
        </h2>
        <p className="text-sm text-muted">All fields are required.</p>
      </div>
      <Field
        label="Requested Role"
        value={<Badge variant="brand">{role.name}</Badge>}
      />
      <TextArea
        ref={justificationRef}
        label="Justification"
        name="justification"
        hint="Explain why you need this role."
        required
        error={
          missingJustification ? "Please enter a justification." : undefined
        }
        onChange={() => setMissingJustification(false)}
      />
      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full text-lg">
          Submit Request
        </Button>
        <Button href="/access" variant="text" className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  );
}
